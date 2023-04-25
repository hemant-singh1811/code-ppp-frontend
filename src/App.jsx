import './App.css';
import MainRouting from './user access/MainRouting';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/sidebar/Sidebar';
import { initSocket } from './store/features/sockets/SocketWebDataSlice';
import { useEffect, useState } from 'react';
import AddTable from './components/Table/tableUtilities/AddTable';
import Modal from './components/utilities/modal/Modal';
import RefreshPageModal from './components/utilities/modal/RefreshPageModal';
import 'material-symbols/rounded.scss';
import FileViewer from './components/Table/tableUtilities/FileReader';

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { isOpen } = useSelector((state) => state.globalState.addToggle);
  useEffect(() => dispatch(initSocket()), [dispatch]);

  return (
    <div className='flex w-screen h-screen '>
      {userInfo && <Sidebar />}
      <div className='relative w-full flex'>
        <MainRouting />
        {isOpen && <AddTable />}
        <FileViewer />
        <Modal />
      </div>
      <RefreshPageModal />
    </div>
  );
}

export default App;
