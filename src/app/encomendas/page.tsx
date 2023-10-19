'use client'
import TableOrders from "@/components/TableOrders"
import { getOrders } from "@/utils/getOrders"
import { useEffect, useState } from "react"

export default function Encomendas() {
  const [orders, setOrders] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders)
      } catch (error) {
        console.error('Erro ao buscar dados do vendedor:', error);
      }
    };
    fetchData();
    setDone(false)
  }, [done])

  const handleDone = (data: boolean) => {
    setDone(data)
  }
  return (
    <main className="p-5 w-full overflow-auto">
      <div className="bg-white shadow-md rounded py-6 overflow-x-auto h-full">
        <TableOrders orders={orders} handleDone={handleDone}/>
      </div>
    </main>
  )
}
