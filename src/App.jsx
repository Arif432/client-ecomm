import './App.css'
import ForgotPassword from './components/authentication/ForgotPassword'
import LoginForm from './components/authentication/LoginForm'
import Logout from './components/authentication/Logout'
import SignupForm from './components/authentication/SignupForm'
import UpdatePassword from './components/authentication/UpdatePassword'
import AllAuthors from './components/authors/AllAuthors'
import SingleAuthor from './components/authors/SingleAuthor'
import Cart from './components/carts/Cart'
import AllProducts from './components/products/AllProducts'
import Dashboard from './components/products/Dashboard'
import ProductDetailPage from './components/products/ProductDetail'
import User from './components/products/User'
import {Routes , Route , BrowserRouter} from "react-router-dom"
import AllGenres from './components/genres/AllGenres'
import SingleGenre from './components/genres/SingleGenre'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* AUTHENTICATION */}
        <Route path="/register" element={<SignupForm/>}> </Route>
        <Route path="/login" element={<LoginForm/>}> </Route>
        <Route path="/logout" element={<Logout/>}> </Route>
        <Route path="/admin" element={<Dashboard/>}></Route>
        <Route path='/forget' element={<ForgotPassword/>}></Route>
        <Route path='/updatePassword' element={<UpdatePassword/>}></Route>
        <Route path='/getUserInfo' element={<User/>}> </Route>
       
       {/* Authors */}
       <Route path='/getAllAuthors' element={<AllAuthors/>}> </Route>
        <Route path='/author/:id' element={<SingleAuthor/>}> </Route>

      {/* genres */}
        <Route path='/getAllGenres' element={<AllGenres/>}> </Route>
        <Route path='/getSingleGenre/:id' element={<SingleGenre/>}> </Route>

        {/* PRODUCTS  */}
        {/* <Route path="/allProducts" element={<AllProducts/>}></Route> */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/" element={<AllProducts/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='*' element={<h1>404 Not Found</h1>}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
