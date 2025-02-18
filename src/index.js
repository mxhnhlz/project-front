import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
)
