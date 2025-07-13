import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (

    <div className='w-full h-full min-h-screen flex flex-col '>
      <NavBar />
      <main className='w-full h-full flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
