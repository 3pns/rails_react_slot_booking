import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'html-duration-picker/dist/html-duration-picker.min'

import {SlotBooking} from "./components/SlotBooking"

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>

      <div className="container">
        <SlotBooking/>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
        />

      </div>
    </QueryClientProvider>

  )
}

export default App;
