import './estilos/Hero.css'

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero--title">
        <h2>Gestión Profesional de Transporte</h2>
        <p>Sistema completo para administrar tu flota de vehículos, conductores y viajes de manera eficiente y profesional.</p>
      </div>
      <div className="hero--button">
        <a href='#viajes'>
          <button>
            Gestionar
          </button>
        </a>
      </div>
    </div>
  )
}