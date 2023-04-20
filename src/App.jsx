import './App.css';
import MainRouting from './user access/MainRouting';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/sidebar/Sidebar';
import { initSocket } from './store/features/sockets/SocketWebDataSlice';
import { useEffect, useState } from 'react';
import AddTable from './components/Table/tableUtilities/AddTable';
import Modal from './components/utilities/modal/Modal';
import 'material-symbols';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initSocket()), [dispatch]);
  const { userInfo } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socketWebData);
  const { isOpen, type, action, name, baseId, tableId } = useSelector(
    (state) => state.globalState.addToggle
  );
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   const onload = window.addEventListener('load', () => {
  //     setIsLoaded(true);
  //   });

  //   return () => {
  //     onload;
  //   };
  // }, []);

  return socket ? (
    <div className='flex w-screen h-screen '>
      {userInfo && <Sidebar />}
      <div className='relative w-full flex'>
        <MainRouting />
        {isOpen && <AddTable />}
        <Modal />
      </div>
    </div>
  ) : (
    'Refresh page'
  );
}

export default App;
