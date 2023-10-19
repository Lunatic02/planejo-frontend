'use client'
import { Sell } from '@/@types/Sell';
import { deleteSells } from '@/utils/deleteSell';
import { formatDate } from '@/utils/formatDate';
import React, { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

interface TableSellsParam {
  sells: Sell[],
  handleDeleteBoolean: Function,
}

export default function TableSells({ sells, handleDeleteBoolean }: TableSellsParam) {
  const [filterSeller, setFilterSeller] = useState('all');
  const [filterClient, setFilterClient] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [totalValue, setTotalValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const nextPage = () => {
    if (currentPage < Math.ceil(filteredSells.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredSells = sells.filter((sell: Sell) => {
    const sellerMatch = filterSeller === 'all' || sell.seller.name === filterSeller;
    const clientMatch = filterClient === '' || sell.client.name.toLowerCase().includes(filterClient.toLowerCase());

    if (filterDate === '7') {
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      return sellerMatch && clientMatch && new Date(sell.date) >= last7Days;
    } else if (filterDate === '30') {
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      return sellerMatch && clientMatch && new Date(sell.date) >= last30Days;
    } else if (filterDate === '365') {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return sellerMatch && clientMatch && new Date(sell.date) >= lastYear;
    } else {
      return sellerMatch && clientMatch;
    }
  });
  const sellsToDisplay = filteredSells.slice(startIndex, endIndex);

  useEffect(() => {
    const sum = sellsToDisplay.reduce((total: number, sell: Sell) => total + sell.amount, 0);
    setTotalValue(sum);
  }, [sellsToDisplay]);

  const handleDelete = (id: number) => {
    deleteSells(id);
    handleDeleteBoolean(true)
  };  

  return (
    <div>
      <div className="flex gap-2 p-3">
        <div className="flex gap-2">
          <label className='p-1'>Vendedor:</label>
          <select
            id="filterSeller"
            value={filterSeller}
            className='p-1 rounded'
            onChange={(e) => setFilterSeller(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="Lucas Henrique Torresin da Costa">Lucas Henrique Torresin da Costa</option>
            <option value="Maike Torresin Bigoli">Maike Torresin Bigoli</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label className='p-1'>Cliente:</label>
          <input
            id="filterClient"
            type="text"
            className='p-1 border rounded'
            value={filterClient}
            placeholder='Pesquise o nome do cliente'
            onChange={(e) => setFilterClient(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label className='p-1'>Data:</label>
          <select
            className='p-1 rounded'
            id="filterDateRange"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="all">Todas as datas</option>
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="365">Último ano</option>
          </select>
        </div>
      </div>
      <div className='flex gap-2 m-2'>
        <div className='text-xl flex gap-4 items-center'><h1>Total Vendido de acordo com os filtros:</h1> <p className=' p-3 rounded-lg text-zinc-900'>{totalValue}R$</p></div>
      </div>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-center"></th>
            <th className="py-3 px-6 text-center">Valor</th>
            <th className="py-3 px-6 text-center">Itens</th>
            <th className="py-3 px-6 text-center">Pagamento</th>
            <th className="py-3 px-6 text-center">Vendedor</th>
            <th className="py-3 px-6 text-center">Cliente</th>
            <th className="py-3 px-6 text-center">Data da venda</th>
            <th className="py-3 px-6 text-center">Encomenda?</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sellsToDisplay.map((sell: Sell) => {
            const formattedDate = formatDate(sell.date);
            return (
              <tr key={sell.id} className="border-b border-gray-200 hover-bg-gray-100">
                <td className="py-3 px-6 text-center">
                  <span
                    onClick={() => { handleDelete(sell.id) }}
                    className='hover:text-red-500 transition-all cursor-pointer'
                  >
                    <BsFillTrashFill />
                  </span>
                </td>
                <td className="py-3 px-6 text-center">${sell.amount}</td>
                <td className="py-3 px-6 text-center">{sell.products.product}</td>
                <td className="py-3 px-6 text-center">{sell.paymentType}</td>
                <td className="py-3 px-6 text-center">{sell.seller.name}</td>
                <td className="py-3 px-6 text-center">{sell.client.name}</td>
                <td className="py-3 px-6 text-center">{formattedDate}</td>
                {sell.order ? (
                  <td className="py-3 px-6 text-center text-green-500">Encomenda</td>
                ) : (
                  <td className="py-3 px-6 text-center text-red-500">Não é encomenda</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-around">
        <button onClick={prevPage} className='w-20 p-2'>
          {currentPage === 1 ? null : <p className='text-lg hover:text-zinc-700'>Anterior</p>}
        </button>
        <button onClick={nextPage} className='w-20 p-2'>
          {currentPage === Math.ceil(filteredSells.length / itemsPerPage) ? null : <p className='text-lg hover:text-zinc-700'>Próxima</p>}
        </button>
      </div>
    </div>
  );
}