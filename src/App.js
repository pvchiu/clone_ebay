import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Store from "./pages/Store"
import ProductDetail from "./pages/ProductDetail"
import AdminProducts from "./pages/Admin"
import CreateProduct from "./pages/CreateProduct"
import UpdateProduct from "./pages/UpdateProduct"

function App() {
  return (
    <Router>
      <div className="App">
        
        <Header />
        
        
        <main className="container py-4">
          <Routes>
            {/* Trang chủ */}
            <Route path="/" element={<Home />} />
            
            {/* Trang đăng nhập */}
            <Route path="/login" element={<Login />} />
            
            {/* Trang hiển thị danh sách sản phẩm theo danh mục */}
            <Route path="/store/:categoryId" element={<Store />} />
            
            {/* Trang chi tiết sản phẩm */}
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminProducts />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/edit/:id" element={<UpdateProduct />} />
          </Routes>
        </main>
        
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
