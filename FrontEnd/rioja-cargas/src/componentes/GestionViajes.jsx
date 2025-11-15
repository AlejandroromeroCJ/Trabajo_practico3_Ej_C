import './estilos/GestionViajes.css'
import { useEffect, useState } from 'react'
import { useDB } from '../contexto/databaseContext'


export default function GestionViajes(){
  const [vehiculos, setVehiculos] = useState([])
  const [viajes, setViajes] = useState([])
  const [conductores, setConductores] = useState([])
  const [filterForCategory, setFilterForCategory] = useState(true)
  const [filterAplicado, setFilterAplicado] = useState(false)
  const [elementoAFiltrar, setElementoAFiltrar] = useState('')
  const [viajesFiltrados, setViajesFiltrados] = useState([])
  const [error, setError] = useState({
    exists: false,
    message: ''
  })
  const [totalKM, setTotalKM] = useState(0)

  // Contexto
  const {
    obtenerVehiculos,
    obtenerViajes,
    obtenerConductores
  } = useDB()

  // Fetchs
  useEffect(() => {
    const fetchTodo = async() => {
      let vjs = await obtenerViajes()
      let vhc = await obtenerVehiculos()
      let conduct = await obtenerConductores()

      if(vjs.error || vhc.error || conduct.error){
        setError({
          exists: true,
          message: vjs.message || vhc.message || conduct.message
        })
        return
      }

      setVehiculos(vhc.data)
      setViajes(vjs.data)
      setConductores(conduct.data)
      setViajesFiltrados(vjs.data)
      setElementoAFiltrar(`c-${conduct.data[0].idconductores}`)
    }  
    fetchTodo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = (e) => {
    if(e.target.value == 'true'){
      setFilterForCategory(true)
    }else{
      setFilterForCategory(false)
    }
  }

  const handleAplicarFiltro = () => {
    console.log(elementoAFiltrar)
    setFilterAplicado(true)
    let sumaKM = 0;
    if(elementoAFiltrar.split('-')[0] == 'c'){
      // filtrar por conductor
      let filtered = viajes.filter(v => v.conductor_id == elementoAFiltrar.split('-')[1])
      filtered.forEach(v => {
        sumaKM += v.kilometros
      })
      setTotalKM(sumaKM)
      setViajesFiltrados(filtered)
    }else{
      // filtrar por vehiculo
      let filtered = viajes.filter(v => v.vehiculo_id == elementoAFiltrar.split('-')[1])
      filtered.forEach(v => {
        sumaKM += v.kilometros
      })
      setTotalKM(sumaKM)
      setViajesFiltrados(filtered)
    }
  }

  const handleBorrarFiltro = () => {
    setFilterAplicado(false)
    setViajesFiltrados(viajes)
  }

  if(error.exists){
    return(
      <p>Error cargando información de viajes - {error.message}</p>
    )
  }


  return(
    <div className="gestion-vehiculos">
      <div className="gestion-vehiculos--title">
        <h3>Gestión de viajes</h3>
        <p>Administra los viajes</p>
      </div>
      <div className='agregar-vehiculo--btn-container agregar-viaje--btn-container'>
        <div className='viajes-filters'>
          <p>Filtrar por:</p>
          <select name="filtro" id="filtro" onChange={handleFilterChange}>
            <option value={true}>Conductor</option>
            <option value={false}>Vehiculo</option>
          </select>
          <select name="elemento" id="elemento" onChange={
            (e) => {setElementoAFiltrar(e.target.value)}
          }>
            {
              filterForCategory ?
                conductores.map(conduct => (
                  <option
                    key={conduct.idconductores}
                    value={`c-${conduct.idconductores}`}  
                  >
                    {conduct.nombre} {conduct.apellido}
                  </option>
                ))
              :
                vehiculos.map(vehiculo => (
                  <option 
                    key={vehiculo.idvehiculos}
                    value={`v-${vehiculo.idvehiculos}`}
                  >{vehiculo.patente}</option>
                ))
            }
          </select>
          <button onClick={handleAplicarFiltro}>Aplicar Filtro</button>
          
          {
            filterAplicado &&
            <button onClick={handleBorrarFiltro}>Borrar Filtro</button>
          }
          {
            filterAplicado &&
            <p style={{color: "green"}}>Total KM recorridos: {totalKM}</p>
          }
        </div>
      </div>
      <div className="gestion-vehiculos--list">
        <table className="tabla-vehiculos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehiculo</th>
              <th>Conductor</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Partida</th>
              <th>Llegada</th>
            </tr>
          </thead>
          <tbody>
            {
              viajesFiltrados.map((v) => (
                <tr key={v.idviajes}>
                  <td>{v.idviajes}</td>
                  <td>
                  {vehiculos.filter(vhc => vhc.idvehiculos == v.vehiculo_id)[0].patente}
                  </td>
                  <td>
                  {
                    `${conductores.filter(c => c.idconductores == v.conductor_id)[0].nombre} ${conductores.filter(c => c.idconductores == v.conductor_id)[0].apellido}`
                  }
                  </td>
                  <td>{v.origen}</td>
                  <td>{v.destino}</td>
                  <td>{v.fecha_salida.split('T')[0]}</td>
                  <td>{v.fecha_llegada.split('T')[0]}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}