'use client'

import { useState } from "react"

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [wrongCredentials, setWrongCredentials] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()

    await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    }).then(response => response.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          window.location.href = '/';
        } else {
          setWrongCredentials(true)
        }
      })
      .catch(error => {
        console.error('Erro no login:', error);
        setWrongCredentials(true)
      });
  }
  return (
    <main className='h-screen flex flex-col 
    items-center justify-center'>
      <div className='bg-zinc-900 text-zinc-200 p-3 text-center'>
        <h1 className='text-xl'>Faça seu Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col gap-4 p-3 '>
          <label htmlFor="email">Email:</label>
          <input type="text" placeholder='Digite um email cadastrado...' className='p-3 text-zinc-900' onChange={(e) => { setEmail(e.target.value) }} />
          <label htmlFor="Senha:">Senha:</label>
          <input type="text" placeholder='Digite sua senha cadastrada...' className='p-3 text-zinc-900' onChange={(e) => { setPassword(e.target.value) }} />
          <button className='bg-blue-500 p-3 hover:bg-blue-300 hover:transition'>Login</button>
        </form>
      </div>
    </main>
  )
}