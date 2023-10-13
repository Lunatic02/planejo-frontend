import Image from 'next/image'

export default function Home() {
  return (
    <div className='p-4 h-screen w-screen text-center flex flex-col gap-4 justify-center border'>
      <h1 className='text-8xl'>LinhaSystem</h1>
      <h3 className='text-2xl opacity-50'>Sistema para gerenciamento comercial.</h3>
    </div>
  )
}
