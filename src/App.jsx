import "./App.css";
import MainRouting from "./user access/MainRouting";
import SidebarParent from "./components/sidebar/SidebarParent";
import { useSelector } from "react-redux";

function App() {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <div className='app text-white bg-white'>
      {userInfo && <SidebarParent />}
      <MainRouting />
    </div>
  );
}

export default App;
