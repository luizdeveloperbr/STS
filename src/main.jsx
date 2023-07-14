import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import list_routes from './routers'
import Layout from './layout'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={
      createBrowserRouter([
        { path:"/",
          element: <Layout />,
          children: list_routes
        }
        ])
      } />
  </React.StrictMode>
)
