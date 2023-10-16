import { findUniqueClient } from '@/utils/findUniqueClient';
import { findUniqueSeller } from '@/utils/findUniqueSeller';
import { formatDate } from '@/utils/formatDate';
import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';

export default async function TableSells({sells}) {
  return (
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
          {sells.map((sell) => {
            const seller =  findUniqueSeller(sell.sellerId)
            const client =  findUniqueClient(sell.clientId)
            const formattedDate = formatDate(sell.date);
            return (
              <tr key={sell.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-center">
                  <span
                    className='hover:text-red-500 transition-all cursor-pointer'
                    >
                    <BsFillTrashFill />
                  </span>
                </td>
                <td className="py-3 px-6 text-center">${sell.amount}</td>
                <td className="py-3 px-6 text-center">{sell.products.product}</td>
                <td className="py-3 px-6 text-center">{sell.paymentType}</td>
                <td className="py-3 px-6 text-center">{seller.name}</td>
                <td className="py-3 px-6 text-center">{client.name}</td>
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
  )
}
