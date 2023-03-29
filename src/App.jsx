import "./App.css";
import MainRouting from "./user access/MainRouting";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";
import Testing from "./Testing/Testing";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className=" flex w-screen h-screen">
      {userInfo && <Sidebar />}
      <MainRouting />
    </div>
  );
}

export default App;
