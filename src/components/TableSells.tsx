'use client'
import { deleteSells } from '@/utils/deleteSell';
import { formatDate } from '@/utils/formatDate';
import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

export default function TableSells({ sells }) {
  const [filterSeller, setFilterSeller] = useState('all');
  const [filterClient, setFilterClient] = useState('');
  const [filterDate, setFilterDate] = useState('all');

  const filteredSells = sells.filter((sell) => {
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

  return (
    <div>
      <div className="filters">
        <div className="filter">
          <label htmlFor="filterSeller">Filtrar por Vendedor:</label>
          <select
            id="filterSeller"
            value={filterSeller}
            onChange={(e) => setFilterSeller(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="Lucas Henrique Torresin da Costa">Lucas Henrique Torresin da Costa</option>
            <option value="Maike Torresin Bigoli">Maike Torresin Bigoli</option>
            
          </select>
        </div>
        <div className="filter">
          <label htmlFor="filterClient">Pesquisar por Cliente:</label>
          <input
            id="filterClient"
            type="text"
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
          />
        </div>
        <div className="filter">
          <label htmlFor="filterDateRange">Filtrar por Data:</label>
          <select
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
          {filteredSells.map((sell) => {
            const formattedDate = formatDate(sell.date);
            return (
              <tr key={sell.id} className="border-b border-gray-200 hover-bg-gray-100">
                <td className="py-3 px-6 text-center">
                  <span
                    onClick={() => { deleteSells(sell.id) }}
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
    </div>
  );
}