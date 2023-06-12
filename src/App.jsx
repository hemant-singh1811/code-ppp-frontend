import "./stylesheet/App.css";
import MainRouting from "./user access/MainRouting";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";
import AddTable from "./components/Table/tableUtilities/AddTable";
import Modal from "./components/utilities/modal/Modal";
import RefreshPageModal from "./components/utilities/modal/RefreshPageModal";
import FileViewer from "./components/Table/tableUtilities/FileReader";
import { ColorPalletSelect } from "./components/utilities/popover/ColorPalletSelect";
import Menu from "./components/utilities/Menu";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex w-screen h-screen ">
      {userInfo && <Sidebar />}
      <div className="relative w-full flex">
        <MainRouting />
        <AddTable />
        <FileViewer />
        <Modal />
        <Menu />
      </div>
      <RefreshPageModal />
      <ColorPalletSelect />
    </div>
  );
}

export default App;
