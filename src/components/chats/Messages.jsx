import React, { useEffect, useState } from "react";
import _TextMessage from "./message/_TextMessage";
import _ImageMessage from "./message/_ImageMessage";
import _VideoMessage from "./message/_VideoMessage";
import _PdfMessage from "./message/_PdfMessage";
import _AudioMessage from "./message/_AudioMessage";
import _AllFilesMessage from "./message/_AllFilesMessage";

/**
 *
 * @param {Messages}
 * this is a message components which contains all the types of messages components
 *
 *
 */

export default function Messages({ messageApi, userToken }) {
  let typeOfMessage;
  switch (messageApi.typeOfMsg) {
    case "jpg":
    case "jpeg":
    case "ico":
    case "gif":
    case "bmp":
    case "png":
      typeOfMessage = "image";
      break;

    case "m4v":
    case "avi":
    case "mpg":
    case "mp4":
      typeOfMessage = "video";
      break;

    case "mp3":
      typeOfMessage = "audio";
      break;

    case "pdf":
      typeOfMessage = "pdf";
      break;

    case "text":
      typeOfMessage = "text";
      break;

    default:
      typeOfMessage = "OtherFile";
      break;
  }

  // if my user token an message token is same than the message is send by me
  return messageApi?.userToken === userToken ? (
    <div className='w-1/2 justify-end flex items-end pl-4 my-1'>
      {typeOfMessage === "text" && (
        <_TextMessage messageApi={messageApi} type={"send"} />
      )}
      {typeOfMessage === "image" && (
        <_ImageMessage messageApi={messageApi} type={"send"} />
      )}
      {typeOfMessage === "video" && (
        <_VideoMessage messageApi={messageApi} type={"send"} />
      )}
      {typeOfMessage === "audio" && (
        <_AudioMessage messageApi={messageApi} type={"send"} />
      )}
      {typeOfMessage === "pdf" && (
        <_PdfMessage messageApi={messageApi} type={"send"} />
      )}
      {typeOfMessage === "OtherFile" && (
        <_PdfMessage messageApi={messageApi} type={"send"} />
      )}
    </div>
  ) : (
    <div className='w-1/2 self-start flex items-end pr-4 my-1'>
      {typeOfMessage === "text" && <_TextMessage messageApi={messageApi} />}
      {typeOfMessage === "image" && <_ImageMessage messageApi={messageApi} />}
      {typeOfMessage === "video" && <_VideoMessage messageApi={messageApi} />}
      {typeOfMessage === "audio" && <_AudioMessage messageApi={messageApi} />}
      {typeOfMessage === "pdf" && <_PdfMessage messageApi={messageApi} />}
      {typeOfMessage === "OtherFile" && (
        <_AllFilesMessage messageApi={messageApi} />
      )}
    </div>
  );
}
