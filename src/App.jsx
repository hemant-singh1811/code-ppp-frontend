import "./App.css";
import MainRouting from "./user access/MainRouting";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";
import Testing from "./Testing/Testing";
import OpenOptionOnClick from "./components/sidebar/OpenOptionOnClick";
import { FileViewer } from "react-file-viewer";

function App() {
  const { images } = useSelector(state => state.imagesViewer)
  // const [currentImage, setCurrentImage] = useState(0);
  // const [isViewerOpen, setIsViewerOpen] = useState(false);

  // const openImageViewer = useCallback((index) => {
  //   setCurrentImage(index);
  //   setIsViewerOpen(true);
  // }, []);

  // const closeImageViewer = () => {
  //   setCurrentImage(0);
  //   setIsViewerOpen(false);
  // };

  const { userInfo } = useSelector((state) => state.auth);
  const file = 'http://example.com/image.png'
  const type = 'png'
  return (
    <div className="flex w-screen h-screen">
      {userInfo && <Sidebar />}
      <MainRouting />
      {/* <FileViewer
        fileType={type}
        filePath={file}
      // errorComponent={CustomErrorComponent}
      // onError={this.onError} 
      /> */}
      {/* <OpenOptionOnClick /> */}
      {/* 
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.2)"
          }}
          className="w-screen h-screen absolute top-0 left-0"
          closeOnClickOutside={true}
        />
      )} */}
    </div>
  );
}

export default App;
