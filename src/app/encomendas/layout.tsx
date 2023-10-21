import LeftSideMenu from "@/components/LeftSideMenu";

export default function Layout({ children }) {
  return (
    <>
      <main className='flex'>
        <LeftSideMenu />
        {children}</main>
    </>
  )
}