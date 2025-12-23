import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Auth from './components/Auth/Auth.tsx'
import ProtectedRoute from './components/Auth/ProtectedRoute.tsx'
import AuthProvider from './context/AuthContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<ProtectedRoute><App /></ProtectedRoute> ,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}>
  </RouterProvider>
  <Toaster/>
  </AuthProvider>
  </StrictMode>,
)
