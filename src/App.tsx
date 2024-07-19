import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaUsuarios from './pages/ListaUsuarios'
import Tickets from './pages/Tickets';
import './App.css'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/usuarios" element={<ListaUsuarios />} />
        <Route path="/tickets" element={<Tickets/>} />
        {/* Configura otras rutas aquí, usando element en lugar de component */}
      </Routes>
    </Router>
  )
}

export default App
