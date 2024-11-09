import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/App.jsx'
import TicTacToe from './Pages/TicTacToe.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Product from './Pages/Product.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/tic-tac-toe',
    element: <TicTacToe />
  },
  {
    path: '/product',
    element: <Product />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
