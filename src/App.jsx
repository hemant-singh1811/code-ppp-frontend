import './App.css';
import MainRouting from './user access/MainRouting';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/sidebar/Sidebar';
import { initSocket } from './store/features/sockets/SocketWebDataSlice';
import { useEffect, useState } from 'react';
import AddTable from './components/Table/tableUtilities/AddTable';
import Modal from './components/utilities/modal/Modal';
// import 'material-symbols';
import RefreshPageModal from './components/utilities/modal/RefreshPageModal';
import '@material-design-icons/font';

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
        <Modal />
      </div>
      <span class='material-icons'>menu</span>
      <span class='material-icons-outlined'>face</span>
      <span class='material-icons-round'>face</span>
      <span class='material-icons-sharp'>face</span>
      <span class='material-icons-two-tone'>face</span>
      <RefreshPageModal />
    </div>
  );
}

export default App;
