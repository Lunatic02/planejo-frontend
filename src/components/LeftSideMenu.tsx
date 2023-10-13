import {BsFillBoxFill, BsFillCartCheckFill, BsFillPersonPlusFill, BsPencilSquare, BsPersonBoundingBox} from 'react-icons/bs'

export default function LeftSideMenu() {
  return (
    <aside className="w-60 min-w-max bg-zinc-100 border-zinc-300 shadow-2xl border h-screen">
      <div className="p-4 flex-grow h-full flex flex-col">
        <h1 className="text-2xl font-bold h-20 p-2">LinhaSystem</h1>
        <nav className="flex flex-col h-max gap-5 text-lg flex-1">
          <a href="" className='flex items-center gap-2 p-2 hover:bg-zinc-900 hover:text-zinc-100 hover:rounded-lg hover:transition'><BsPencilSquare />Cadastrar Venda</a>
          <a href="" className='flex items-center gap-2 p-2 hover:bg-zinc-900 hover:text-zinc-100 hover:rounded-lg hover:transition'><BsFillCartCheckFill/>Todas as Vendas</a>
          <a href="" className='flex items-center gap-2 p-2 hover:bg-zinc-900 hover:text-zinc-100 hover:rounded-lg hover:transition'><BsFillPersonPlusFill/>Cadastrar Cliente</a>
          <a href="" className='flex items-center gap-2 p-2 hover:bg-zinc-900 hover:text-zinc-100 hover:rounded-lg hover:transition'><BsPersonBoundingBox />Todos os Clientes</a>
          <a href="" className='flex items-center gap-2 p-2 hover:bg-zinc-900 hover:text-zinc-100 hover:rounded-lg hover:transition'><BsFillBoxFill />Encomendas</a>
        </nav>
        <p className='text-sm opacity-50'>copyright © 2023<br />todos os direitos reservados</p>
      </div>
    </aside>
  )
}
