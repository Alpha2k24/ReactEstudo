import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/contextData.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Relogio from './pages/relogio.jsx'
import Info from './pages/info.jsx'
import Dashboard from './pages/dashboard.jsx'


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/ReactEstudo", element: <App /> },
  { path: "/relogio", element: <Relogio /> },
  { path: "/dashboard/:id", element: <Dashboard /> },
  { path: "/*", element: <Info /> },
])

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </DataProvider>
  ,
)
