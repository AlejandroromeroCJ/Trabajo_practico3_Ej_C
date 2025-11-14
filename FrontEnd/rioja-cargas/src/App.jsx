import './App.css'
import GestionConductores from './componentes/GestionConductores'
import Header from './componentes/Header'
import Hero from './componentes/Hero'
import GestionVehiculos from './componentes/GestionVehiculos'

function App() {

  return (
    <>
      <Header/>
      <Hero/>
      <GestionVehiculos/>
      <GestionConductores/>
    </>
  )
}

export default App
