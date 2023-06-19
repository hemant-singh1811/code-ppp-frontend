import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/utilities/Loading";
import { userLogin } from "../../store/features/auth/authActions";
import axios from "axios";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { googleLogin } from "../../store/features/auth/authSlice";
import { ref } from "firebase/storage";



// import Modal from 'react-modal';
// import './Modal.css'; // import your custom modal styles

export default function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // redirect authenticated user to profile screen
  useEffect(() => {
    try{
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const decodedToken = jwtDecode(refreshToken);
    console.log(decodedToken);
    if (decodedToken.verified_email) {
      decodedToken.userToken = refreshToken;
      dispatch(googleLogin(decodedToken))
      navigate("/");
    }
    }catch(err){
      console.log(err);
    }
    
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  if (loading) {
    return (
      <div className="mx-auto">
        <Loading />
      </div>
    );
  }

  function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri: "http://localhost:8080/auth/google",
      client_id:
        "333939866440-quro3d2ls4tn9o0cn091g3l9gp304v42.apps.googleusercontent.com",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  }

  const handleGoogleLogin = async () => {
    try {
      window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-screen gradient-form bg-gray-200 md:h-screen w-screen">
      <div className="container py-12 px-6 h-full w-full m-auto">
        <div className="flex justify-center items-center m-auto flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0 px-6 py-8 ">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="logo.webp"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                        We are The Alpha Lion Team
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit(submitForm)}>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Username"
                          {...register("email")}
                          required
                        />
                      </div>
                      <div className="mb-4 relative flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Password"
                          {...register("password")}
                          required
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute  z-50 right-2 text-xl cursor-pointer select-none"
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="bg-orange-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                        >
                          Log in
                        </button>
                        {/* <a className='text-gray-500'>Forgot password?</a> */}
                        {}
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        {/* <p className='mb-0 mr-2'>Don't have an account?</p> */}
                        <a href={getGoogleOAuthURL()} className="w-full">
                          <button
                            className="bg-orange-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="button"
                          >
                            Log in with Google
                          </button>
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-slate-100">
                  <div className=" px-4 py-6 md:p-12 md:mx-6">
                    <h4 className="text-xl font-semibold mb-6">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
