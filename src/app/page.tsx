'use client'

import LeftSideMenu from "@/components/LeftSideMenu";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, [])
  return (
    <div className="flex">
      <LeftSideMenu />
      <div className='p-4 h-screen w-screen text-center flex flex-col gap-4 justify-center border'>
        <h1 className='text-8xl'>LinhaSystem</h1>
        <h3 className='text-2xl opacity-50'>Sistema para gerenciamento comercial.</h3>
      </div>
    </div>
  )
}
