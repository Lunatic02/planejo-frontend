import LeftSideMenu from "@/components/LeftSideMenu";

export default function Layout({ children }: any) {
  return (
    <>
      <main className='flex'>
        <LeftSideMenu />
        {children}</main>
    </>
  )
}