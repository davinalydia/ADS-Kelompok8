import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import './index.css'

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}