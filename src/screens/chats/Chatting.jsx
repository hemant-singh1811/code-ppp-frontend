import React, { useEffect, useRef } from "react";
import Messages from "../../components/chats/Messages";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
// import ReactTextareaAutosize from "react-textarea-autosize";
import { addMessage, updateMessage } from "../../store/features/messageSlice";
import UniqueCharacterGenerator from "../../utilities/UniqueCharacterGenerator";
import DateGenerator from "../../utilities/DateGenerator";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function Chatting({ userToken, socket }) {
  // hooks called
  const load = useSelector((state) => state.load.load);
  const dispatch = useDispatch();
  const messageInput = useRef(null);
  const mainChatRef = useRef(null);
  const handlePickUpFileClick = useRef(null);
  const { messages } = useSelector((state) => state.message);
  const currentDateTime = DateGenerator();

  const send = (text, userToken, url, type, file_name) => {
    let box = {
      userToken: userToken,
      data: {
        createdAt: currentDateTime,
        deletedForEveryone: "",
        deletedForMe: "",
        from: "Praditya",
        isSeen: "",
        seenBy: [],
        text: text,
        to: "",
        typeOfMsg: type,
        url: url || "",
        file_name: file_name || "",
        group_id: load?.truck_id[0] || "",
        userId: "praditya",
      },
    };
    socket.emit("send_msg", box);
  };

  //input add msg
  const handleAddMessage = () => {
    const textMessage = messageInput.current.value.trim();
    if (textMessage !== "") {
      dispatch(
        addMessage({
          userToken: userToken,
          createdAt: currentDateTime,
          deletedForEveryone: "",
          deletedForMe: "",
          from: "praditya",
          isSeen: "",
          seenBy: [],
          text: textMessage,
          to: "",
          typeOfMsg: "text",
          status: "loading",
          url: "",
        })
      );
    }
    send(messageInput.current.value, userToken, "", "text");
    messageInput.current.value = "";
    messageInput.current.rows = 1;
    messageInput.current.style.height = "40px";
  };

  function ScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
    return <div ref={elementRef} />;
  }

  function uploader(e) {
    const message_id = UniqueCharacterGenerator();
    const file = e.target.files[0];
    let file_name = file.name;
    const reader = new FileReader();
    let parts = file_name.split(".");
    let fileType = parts[parts.length - 1];
    file_name = file_name.slice(0, file_name.length - fileType.length - 1);
    file_name = `${file_name}.${fileType}`;
    handlePickUpFileClick.current.value = null;
    reader.readAsDataURL(file);

    reader.addEventListener("load", async (e) => {
      // let handleUploading = async () => {
      const storageRef = ref(storage, file_name);
      // 'file' comes from the Blob or File API
      try {
        dispatch(
          addMessage({
            message_id: message_id,
            userToken: userToken,
            createdAt: currentDateTime,
            deletedForEveryone: "",
            deletedForMe: "",
            from: "Praditya",
            isSeen: "",
            seenBy: [],
            text: "",
            to: "ayush",
            typeOfMsg: fileType,
            url: e.target.result,
            status: "uploading",
            uploadProgressInPercentage: 0,
            file_name: file_name,
          })
        );
        // const uploadTask = await uploadBytes(storageRef, file);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            // const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            // console.log(progress)
            // dispatch(
            //   updateMessage({
            //     message_id: message_id,
            //     userToken: userToken,
            //     createdAt: currentDateTime,
            //     deletedForEveryone: "",
            //     deletedForMe: "",
            //     from: "Praditya",
            //     isSeen: "",
            //     seenBy: [],
            //     text: "",
            //     to: "ayush",
            //     typeOfMsg: fileType,
            //     url: e.target.result,
            //     status: "uploading",
            //     uploadProgressInPercentage: progress,
            //     file_name: file_name,
            //   })
            // );
            // console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //   case 'paused':
            //     console.log('Upload is paused');
            //     break;
            //   case 'running':
            // console.log('Upload is running');
            //     break;
            // }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log('File available at', downloadURL);
              // console.log(downloadURL)
              send("", userToken, downloadURL, fileType, file_name);
              dispatch(
                updateMessage({
                  message_id: message_id,
                  userToken: userToken,
                  createdAt: currentDateTime,
                  deletedForEveryone: "",
                  deletedForMe: "",
                  from: "Praditya",
                  isSeen: "",
                  seenBy: [],
                  text: "",
                  to: "ayush",
                  typeOfMsg: fileType,
                  url: downloadURL,
                  status: "uploaded",
                  uploadProgressInPercentage: 100,
                  file_name: file_name,
                })
              );
            });
          }
        );

        // const starsRef = ref(storage, file_name);
        //   getDownloadURL(starsRef)
        //     .then((url) => {
        //       send("", userToken, url, fileType, file_name);
        //     })
        //     .catch((error) => {
        //       // A full list of error codes is available at
        //       // https://firebase.google.com/docs/storage/web/handle-errors
        //       switch (error.code) {
        //         case "storage/object-not-found":
        //           console.log("File doesn't exist");
        //           // File doesn't exist
        //           break;
        //         case "storage/unauthorized":
        //           console.log(
        //             "User doesn't have permission to access the object"
        //           );
        //           // User doesn't have permission to access the object
        //           break;
        //         case "storage/canceled":
        //           console.log("User canceled the upload");
        //           // User canceled the upload
        //           break;
        //         case "storage/unknown":
        //           // Unknown error occurred, inspect the server response
        //           break;
        //       }
        //     });
        // }
      } catch (e) {
        console.log(e);
      }
    });
  }

  // const handleClickScroll = () => {
  //   const element = document.getElementById("section-1");
  //   if (element) {
  //     // 👇 Will scroll smoothly to the top of the next section
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='w-full flex flex-col h-[calc(100%-5.8rem)] mainChatBg bg-effect-5'>
      <div
        ref={mainChatRef}
        id='mainChat'
        className='flex flex-col items-end  px-4 py-2 overflow-y-scroll flex-1'
        // ref={listRef}
        // onClick={handleClickScroll}
        // onResize={handleClickScroll}
        // onChange={handleClickScroll}
        // on
        // onChange={() => handleClickScroll()}
      >
        {messages.map((element, index) => {
          return (
            <Messages key={index} messageApi={element} userToken={userToken} />
          );
        })}
        <div ref={messagesEndRef} />
        {/* <ScrollToBottom /> */}
      </div>
      {/* {mainChatRef.current?.lastElementChild?.scrollIntoView()} */}
      <div className='flex p-1 items-end gap-1 bg-[#e7e7e6] border-t-[#DBDBDB] border-t-[1px]'>
        <div onClick={() => handlePickUpFileClick.current.click()}>
          <input
            type='file'
            id='file'
            ref={handlePickUpFileClick}
            onChange={(e) => {
              if (e.target.files[0]) uploader(e);
            }}
            style={{ display: "none" }}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 mb-2 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
            />
          </svg>
        </div>
        <div
          className={`bg-white shadow-sm rounded-md w-full ${
            messageInput.current?.rows > 3 ? "pb-2" : "pb-0"
          }`}
        >
          <ReactTextareaAutosize
            maxRows={4}
            type='text'
            placeholder='Type something...'
            rows={1}
            ref={messageInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.keyCode == 13 && e.shiftKey) {
                  if (e.target.rows <= 4) {
                    e.target.rows = e.target.rows + 1;
                  }
                } else {
                  if (messageInput.current.value.trim() !== "") {
                    handleAddMessage(messageInput.current);
                  }
                  e.preventDefault();
                }
              }
            }}
            id='message'
            className='textarea_like_whatsapp px-3 py-2 w-full placeholder-slate-400 border-none focus:outline-none '
            data-text='Type something...'
          />
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6 mb-2'
          onClick={() => handleAddMessage(messageInput.current)}
        >
          <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
        </svg>
      </div>
    </div>
  );
}
