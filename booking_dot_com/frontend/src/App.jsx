import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar activeTab="Stays" />

      <main className="min-h-screen">
        {/* các trang sẽ render ở đây */}
      </main>

      <Footer />
    </div>
  )
}

export default App
