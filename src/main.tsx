import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Map from './Components/Map'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Map />
    {/* <App /> */}
    {/* <h1>Hello World</h1>
    <h2>time to make a map</h2> */}
  </StrictMode>,
)
