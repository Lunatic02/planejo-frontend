'use client'

import React, { useState } from "react";
import { Client } from "@/@types/Clients";
import { deleteClients } from "@/utils/deleteClients";
import { BsFillTrashFill } from "react-icons/bs";

interface TableClientsParam {
  clients: Client[],
  handleDeleteBoolean: Function,
}

export default function TableClients({ clients, handleDeleteBoolean }: TableClientsParam) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = (id: number) => {
    deleteClients(id);
    handleDeleteBoolean(true);
  };

  const getFilteredAndPaginatedClients = () => {
    let filteredClients = clients;

    if (searchTerm) {
      filteredClients = filteredClients.filter((client: Client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredClients.slice(startIndex, endIndex);
  };

  const paginatedClients = getFilteredAndPaginatedClients();
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
            <th className="py-3 px-6 text-center">Nome</th>
            <th className="py-3 px-6 text-center">Genero</th>
            <th className="py-3 px-6 text-center">Data Nascimento</th>
            <th className="py-3 px-6 text-center">Telefone</th>
            <th className="py-3 px-6 text-center">Email</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {paginatedClients.map((client: Client) => {
            return (
              <tr key={client.id} className="border-b border-gray-200 hover-bg-gray-100">
                <td className="py-3 px-6 text-center">
                  <span
                    onClick={() => {
                      handleDelete(client.id);
                    }}
                    className="hover:text-red-500 transition-all cursor-pointer"
                  >
                    <BsFillTrashFill />
                  </span>
                </td>
                <td className="py-3 px-6 text-center">{client.name}</td>
                <td className="py-3 px-6 text-center">{client.gender}</td>
                <td className="py-3 px-6 text-center">{client.birthDate}</td>
                <td className="py-3 px-6 text-center">{client.cellphone}</td>
                <td className="py-3 px-6 text-center">{client.email}</td>
              </tr>
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
          disabled={paginatedClients.length < itemsPerPage}
          className="ml-2 disabled:text-gray-400 text-gray-900"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
