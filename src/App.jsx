import './App.css';
import MainRouting from './user access/MainRouting';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/sidebar/Sidebar';
import { initSocket } from './store/features/sockets/SocketWebDataSlice';
import { useEffect } from 'react';
import AddTable from './components/Table/tableUtilities/AddTable';
import Modal from './components//utilities//Modal';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initSocket()), [dispatch]);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='flex w-screen h-screen '>
      {userInfo && <Sidebar />}
      <div className='relative w-full flex'>
        <MainRouting />
        <AddTable />
        <Modal />
      </div>
    </div>
  );
}

export default App;
