import "./App.css";
import MainRouting from "./user access/MainRouting";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="app text-white bg-slate-700">
      {userInfo && <Sidebar />}
      <MainRouting />
    </div>
  );
}

export default App;
