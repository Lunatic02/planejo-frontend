'use client'
import { Client } from '@/@types/Clients';
import { Seller } from '@/@types/Seller';
import { getClientInfo } from '@/utils/getClientInfo';
import { getSellersInfo } from '@/utils/getSellersInfo';
import React, { useEffect, useState } from 'react';

export default function NovaVenda() {
  const [sellerData, setSellerData] = useState<Seller[]>([]);
  const [clientData, setClientData] = useState<Client[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const seller = await getSellersInfo();
        const client = await getClientInfo()
        setSellerData(seller);
        setClientData(client)
      } catch (error) {
        console.error('Erro ao buscar dados do vendedor:', error);
      }
    };

    fetchData();
  }, [])

  const [order, setOrder] = useState(false)
  console.log(order)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  const handleCheckboxClick = () => {
    setOrder(!order)
  }

  let content
  content = (

    <div className='flex gap-4 flex-col'>
      <h1>Preencha os campos da encomenda.</h1>
      <div className='flex items-center gap-4'>
        <input type="text" className='p-2 border' placeholder='Fornecedor' />
        <label>Data de entrega da encomenda?: </label>
        <input type="date" className='p-2 border' placeholder='Fornecedor' />
      </div>
    </div>

  )

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold h-20">Cadastrar venda</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className='flex gap-4 items-center'>
          <label htmlFor="">Cliente:</label>
          <select className='p-2 bg-zinc-50 border rounded' id="Funcionarios">
            {clientData.map((client) => {
              return <option className='' key={client.id} value={client.name}>{client.name}</option>
            })}
          </select>
          <label htmlFor="">Funcionário:</label>
          <select className='p-2 bg-zinc-50 border rounded' id="Funcionarios">
            {sellerData.map((seller) => {
              return <option className='' key={seller.id} value={seller.name}>{seller.name}</option>
            })}
          </select>
        </div>
        <label htmlFor="produtos">Produtos</label>
        <div className='flex gap-4'>
          <textarea name="produtos" id="produtos" cols={50} placeholder='Produtos' className='rounded border resize-none p-2 h-10' />
          <input type="number" className='rounded p-2 w-32 border' placeholder='Valor Total' />
        </div>
        <div className='flex gap-4 items-center'>
          <input type="text" className='rounded p-2 border' placeholder='Forma de pagamento' />
          <label>É uma encomenda?</label>
          <input type="checkbox" value={order} onClick={handleCheckboxClick} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        {order ? <>{content}</> : <div>false</div>}
        <button className='border'>Enviar</button>
      </form>
    </main>
  );
}
