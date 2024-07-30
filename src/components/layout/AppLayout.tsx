import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './template/Header';
import Footer from './template/Footer'; 


export default function AppLayout() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}
