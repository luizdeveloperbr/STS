import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import listRoutes from './routers'
import Layout from './layout'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={
      createBrowserRouter([
        { path:"/",
          element: <Layout routers={listRoutes} />,
          children: listRoutes
        }
        ])
      } />
  // </React.StrictMode>
)
