import './App.css'
import LoginForm from './components/authentication/LoginForm'
import Logout from './components/authentication/Logout'
import SignupForm from './components/authentication/SignupForm'
import AllProducts from './components/products/AllProducts'
import Dashboard from './components/products/Dashboard'
import ProductDetailPage from './components/products/ProductDetail'
import User from './components/products/User'
import {Routes , Route , BrowserRouter} from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupForm/>}> </Route>
        <Route path="/login" element={<LoginForm/>}> </Route>
        <Route path="/logout" element={<Logout/>}> </Route>
        <Route path="/admin" element={<Dashboard/>}></Route>
        {/* <Route path="/allProducts" element={<AllProducts/>}></Route> */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/" element={<AllProducts/>}></Route>
        <Route path='/getUserInfo' element={<User/>}> </Route>
        <Route path='*' element={<h1>404 Not Found</h1>}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
