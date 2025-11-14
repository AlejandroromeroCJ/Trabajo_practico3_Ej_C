import './estilos/Header.css'

export default function Header(){
  return(
    <div className="header">
      <div className="header--logo">
        <h1>Rioja Cargas</h1>
      </div>
      <nav className="header--navbar">
        <a href="#inicio">Inicio</a>
        <a href="#vehiculos">Vehiculos</a>
        <a href="#conductores">Conductores</a>
        <a href="#viajes">Viajes</a>
        <a href="#historial">Historial</a>
        <a href="#calculadora">Calculadora</a>
      </nav>
    </div>
  )
}