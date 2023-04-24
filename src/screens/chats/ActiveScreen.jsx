import React, { useState } from 'react';
import Document from './Document';
import Location from './Location';
import Payroll from './Payroll';
import Dispatch from './Dispatch';
import Chatting from './Chatting';
import _MessageFooter from '../../components/chats/message/_MessageFooter';
import _MessageHeader from '../../components/chats/message/_MessageHeader';
import { useSelector } from 'react-redux';
import NonActiveScreen from './NonActiveScreen';

export default function ActiveScreen({ user_token, socket }) {
  const load = useSelector((state) => state.load.load);
  const [activePage, setActivePage] = useState('chat');
  return (
    <div className=' w-full flex flex-col '>
      {load === null ? (
        <NonActiveScreen />
      ) : (
        <>
          <_MessageHeader />
          {activePage === 'chat' && (
            <Chatting user_token={user_token} socket={socket} />
          )}
          {activePage === 'dispatch' && <Dispatch />}
          {activePage === 'payroll' && <Payroll />}
          {activePage === 'document' && <Document />}
          {activePage === 'location' && <Location />}
          <_MessageFooter
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </>
      )}
    </div>
  );
}
