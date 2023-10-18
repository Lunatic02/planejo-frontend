'use client'
import TableClients from "@/components/TableClients";
import { getClients } from "@/utils/getClients";
import { useState, useEffect } from "react";

export default function TodosClientes() { 
  const [clients, setClients] = useState([])
  const [deleteBoolean, setDeleteBoolean] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await getClients();
        setClients(clients)
      } catch (error) {
        console.error('Erro ao buscar dados do vendedor:', error);
      }
    };
    fetchData();
    setDeleteBoolean(false)
  }, [deleteBoolean])

  const handleDeleteBoolean = (data) =>{
    setDeleteBoolean(data)
  }
  return (
    <main className="p-5 w-full overflow-auto">
      <div className="bg-white shadow-md rounded py-6 overflow-x-auto h-full">
        <TableClients clients={clients} handleDeleteBoolean={handleDeleteBoolean}/>
      </div>
    </main>
  )
}
