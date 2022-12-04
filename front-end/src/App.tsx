import React, { useCallback, useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import useWebSocket, { ReadyState } from 'react-use-websocket';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'html-duration-picker/dist/html-duration-picker.min'

import {SlotBooking} from "./components/SlotBooking"

const App = () => {
  const queryClient = new QueryClient()

    // websockets
    const [socketUrl, setSocketUrl] = useState('ws://localhost:3000/websocket');
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    });
    const handleClickChangeSocketUrl = useCallback(
      () => setSocketUrl('ws://localhost:3000/websocket'),
      []
    );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <SlotBooking sendWsMessage={sendMessage} lastWsMessage={lastMessage} />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
        />

      </div>
    </QueryClientProvider>

  )
}

export default App;
