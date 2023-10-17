'use client'
import { postClient } from "@/utils/postClient"
import { useState } from "react"

export default function NovoClientes() {

  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState('')

  function handleSubmit(e: any) {
    e.preventDefault()
    const clients = JSON.stringify({ name, gender, birthDate, cellphone, email, interests})
    console.log(clients)
    postClient(clients)
  }

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold h-20">Cadastrar cliente</h1>
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div><h1 className="text-lg">Dados cadastrais do cliente:</h1></div>
          <div className="flex items-center gap-4">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" className="p-2 border rounded" placeholder="ex: Lucas Torresin da Costa" onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor="name">Genero:</label>
            <input className="p-2 border rounded" type="text" id="name" placeholder="ex: Masculino" onChange={(e)=>setGender(e.target.value)}/>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="birthDate">Data de Nascimento</label>
            <input type="date" className="border rounded p-2 bg-zinc-900 text-zinc-50" id="birthDate" onChange={(e)=>setBirthDate(e.target.value)}/>
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-lg">Opções de contato:</h1>
          <div className="flex items-center gap-4">
            <label htmlFor="cellphone">Telefone:</label>
            <input className="p-2 border rounded" type="string" id="cellphone" placeholder="ex: (43) 98411-0552" onChange={(e)=>setCellphone(e.target.value)}/>
            <label htmlFor="email">Email:</label>
            <input className="p-2 border rounded" type="email" id="email" placeholder="ex: lucas_hcosta@live.com" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
        </div>
        <label className="text-lg" htmlFor="interests">Interesses:</label>
        <textarea className="rounded border p-3 resize-none" id="interests" placeholder="Ex: Caixas de Mdf" onChange={(e)=>setInterests(e.target.value)}/>
        <button className='border p-2 w-80 bg-blue-500 text-white'>Enviar</button>
      </form>
    </main>
  )
}
