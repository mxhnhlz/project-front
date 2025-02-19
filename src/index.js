import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import Main from './pages/main/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
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
