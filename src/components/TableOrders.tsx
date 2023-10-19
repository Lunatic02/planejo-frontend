'use client'
import { Sell } from "@/@types/Sell";
import { updateOrderDone } from "@/utils/updateOrderDone";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

interface TableOrdersParam {
  orders: Sell[],
  handleDone: Function,
}

export default function TableOrders({ orders, handleDone }: TableOrdersParam) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [done, setDone] = useState(false)
  const itemsPerPage = 10;

  const handleDoneFunction = async (id: number, done: any) => {
    try {
      const doneObject = JSON.stringify({ done })
      await updateOrderDone(id, doneObject);
      handleDone(true);
    } catch (error) {
      console.error(error);
    }
  }

  // const getFilteredAndPaginatedClients = () => {
  //   let filteredClients = orders;

  //   if (searchTerm) {
  //     filteredClients = filteredClients.filter((client: Client) =>
  //       client.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return filteredClients.slice(startIndex, endIndex);
  // };

  // const paginatedClients = getFilteredAndPaginatedClients();
  return (
    <div>
      <div className="flex gap-2 p-3">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md"
        />
      </div>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-center"></th>
            <th className="py-3 px-6 text-center">Valor</th>
            <th className="py-3 px-6 text-center">Produto</th>
            <th className="py-3 px-6 text-center">Cliente</th>
            <th className="py-3 px-6 text-center">Fornecedor</th>
            <th className="py-3 px-6 text-center">Vendedor</th>
            <th className="py-3 px-6 text-center">Data de Entrega</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {orders.map((order: Sell) => {
            return (
              <>
                {
                  order.done ?
                    <tr key={order.id} className="border-b border-gray-200 text-zinc-200 bg-zinc-400">
                      <td className="py-3 px-6 text-center">
                        <span
                          onClick={() => {
                            setDone(!done)
                            handleDoneFunction(order.id, done);
                          }}
                          className="hover:text-red-500  transition-all cursor-pointer"
                        >
                          <ImCheckboxChecked />
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">{order.amount}</td>
                      <td className="py-3 px-6 text-center">{order.products.product}</td>
                      <td className="py-3 px-6 text-center">{order.client.name}</td>
                      <td className="py-3 px-6 text-center">{order.supplier}</td>
                      <td className="py-3 px-6 text-center">{order.seller.name}</td>
                      <td className="py-3 px-6 text-center">{order.deliveryDate}</td>
                    </tr>
                    :
                    <tr key={order.id} className="border-b border-gray-200 hover-bg-gray-100">
                      <td className="py-3 px-6 text-center">
                        <span
                          onClick={() => {
                            setDone(!done)
                            handleDoneFunction(order.id, done);
                          }}
                          className="hover:text-green-500 transition-all cursor-pointer"
                        >
                          <ImCheckboxUnchecked />
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">{order.amount}</td>
                      <td className="py-3 px-6 text-center">{order.products.product}</td>
                      <td className="py-3 px-6 text-center">{order.client.name}</td>
                      <td className="py-3 px-6 text-center">{order.supplier}</td>
                      <td className="py-3 px-6 text-center">{order.seller.name}</td>
                      <td className="py-3 px-6 text-center">{order.deliveryDate}</td>
                    </tr>
                }
              </>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center my-3">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 disabled:text-gray-400 text-gray-900"
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          // disabled={paginatedClients.length < itemsPerPage}
          className="ml-2 disabled:text-gray-400 text-gray-900"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
