import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Wuyah from './Wuyah.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Wuyah />
  </StrictMode>,
)
