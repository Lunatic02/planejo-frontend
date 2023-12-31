'use client'
import TableSells from "@/components/TableSells";
import { getSells } from "@/utils/getSells"
import { useEffect, useState } from "react";

export default function TodasVendas() {
  const [sells, setSells] = useState([])
  const [deleteBoolean, setDeleteBoolean] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sells = await getSells();
        setSells(sells)
      } catch (error) {
        console.error('Erro ao buscar dados do vendedor:', error);
      }
    };
    fetchData();
    setDeleteBoolean(false)
  }, [deleteBoolean])

  const handleDeleteBoolean = (data : boolean) =>{
    setDeleteBoolean(data)
  }
  return (
    <main className="p-5 w-full overflow-auto">
      <div className="bg-white shadow-md rounded py-6 overflow-x-auto h-full">
        <TableSells sells={sells} handleDeleteBoolean={handleDeleteBoolean}/>
      </div>
    </main>
  )
}
