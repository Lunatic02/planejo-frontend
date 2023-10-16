'use client'
import { Client } from '@/@types/Clients';
import { Seller } from '@/@types/Seller';
import { getClientInfo } from '@/utils/getClientInfo';
import { getSellersInfo } from '@/utils/getSellersInfo';
import { postSell } from '@/utils/postSell';
import React, { useEffect, useState } from 'react';

export default function NovaVenda() {
  const [sellerData, setSellerData] = useState<Seller[]>([]);
  const [clientData, setClientData] = useState<Client[]>([]);

  // Create Sell UseState
  const [amount, setAmount] = useState(0)
  const [paymentType, setPaymentType] = useState('')
  const [product, setProduct] = useState({})
  const [order, setOrder] = useState(false)
  const [supplier, setSuplier] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [clientId, setClientId] = useState(1)
  const [sellerId, setSellerId] = useState(1)
   const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const seller = await getSellersInfo();
        const client = await getClientInfo();
        setSellerData(seller);
        setClientData(client);
        setFilteredClients(client); // Initialize filteredClients with all clients
      } catch (error) {
        console.error('Erro ao buscar dados do vendedor:', error);
      }
    };
    fetchData();
  }, []);
  
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const products = {product}
    const sell = JSON.stringify({amount, paymentType, products, order, supplier, deliveryDate, clientId, sellerId})
    postSell(sell)
  }

  const handleCheckboxClick = () => {
    setOrder(!order)
  }
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = clientData.filter((client) =>
      client.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClients(filtered);
  };
  
  //Conteudo aba de encomendas
  let content
  content = (
    <div className='flex gap-4 flex-col'>
      <h1>Preencha os campos da encomenda.</h1>
      <div className='flex items-center gap-4'>
        <input required type="text" className='p-2 border' placeholder='Fornecedor' onChange={(e)=> setSuplier(e.target.value)}/>
        <label>Data de entrega da encomenda?: </label>
        <input required onChange={(e)=>setDeliveryDate(e.target.value)} type="date" className='p-2 border' placeholder='Fornecedor' />
      </div>
    </div>

  )

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold h-20">Cadastrar venda</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className='flex gap-4 items-center'>
          <label htmlFor="">Cliente:</label>
          <input
            type="text"
            className="p-2 bg-zinc-50 border rounded"
            placeholder="Pesquisar cliente"
            onChange={(e) => handleSearch(e.target.value)} // Handle search input
          />
          {filteredClients.length > 0 ? (
            <select
              className="p-2 bg-zinc-50 border rounded"
              id="Funcionarios"
              defaultValue=""
            >
              {filteredClients.map((client) => (
                <option
                  onClick={() => setClientId(client.id)}
                  key={client.id}
                  value={client.name}
                >
                  {client.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-red-500">Nenhum cliente encontrado, <a href="" className='text-blue-900 underline hover:text-blue-500'>cadastrar novo?</a></p>
          )}
          <label htmlFor="">Vendedor:</label>
          {
            sellerData ? <select className='p-2 bg-zinc-50 border rounded' id="Funcionarios">
            {sellerData.map((seller) => {
              return <option className='' onClick={()=>setSellerId(seller.id)} key={seller.id} value={seller.name}>{seller.name}</option>
            })}
          </select> : <p className='text-red-500'>Nenhum Vendedor cadastrado.</p>
          }
        </div>
        <label htmlFor="produtos">Produtos</label>
        <div className='flex gap-4'>
          <textarea name="produtos" onChange={(e)=>{setProduct(e.target.value)}} id="produtos" cols={50} placeholder='Produtos' className='rounded border resize-none p-2 h-10' />
          <input required type="number" onChange={(e)=>setAmount(+e.target.value)} className='rounded p-2 w-32 border' placeholder='Valor Total' />
        </div>
        <div className='flex gap-4 items-center'>
          <input required type="text" className='rounded p-2 border' placeholder='Forma de pagamento' onChange={(e)=>setPaymentType(e.target.value)}/>
          <label>É uma encomenda?</label>
          <input type="checkbox" value={order} onClick={handleCheckboxClick} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        {order ? <>{content}</> : <div></div>}
        <button className='border p-2 w-80 bg-blue-500 text-white'>Enviar</button>
      </form>
    </main>
  );
}
