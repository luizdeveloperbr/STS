import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import listRoutes from './routers'
import LayoutPage from './layout'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={
      createBrowserRouter([
        { path:"/",
          element: <LayoutPage />,
          children: listRoutes
        }
        ])
      } />
  // </React.StrictMode>
)
