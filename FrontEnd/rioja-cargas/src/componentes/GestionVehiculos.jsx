import { useEffect, useState } from 'react'
import './estilos/GestionVehiculos.css'
import EditarVehiculoConductorModal from './EditarVehiculoConductorModal'
import Swal from 'sweetalert2'
import { useDB } from '../contexto/databaseContext'

export default function GestionVehiculos(){
  const [vehiculoSeleccionadoID, setVehiculoSeleccionadoID] = useState(0)
  const [agregarVehiculoModal, setAgregarVehiculoModal] = useState(false)
  const [vehiculos, setVehiculos] = useState([])

  const {obtenerVehiculos} = useDB()

  useEffect(() => {
    const fetchVehiculos = async () => {
      let vehiculos = await obtenerVehiculos()
      if(vehiculos.success){
        setVehiculos(vehiculos.data)
        return
      }

      Swal.fire({
        icon: "error",
        tile: "Error obteniendo vehiculos",
        color: "#222"
      })
    }

    fetchVehiculos()
  },[obtenerVehiculos])

  // const vehiculosEjemplo = [
  //   {
  //     id: "abc123",
  //     marca: "Mercedes",
  //     modelo: "Pro max",
  //     patente: "AB123CD",
  //     año: 2019,
  //     capacidad: 40
  //   }, 
  //   {
  //     id: "bcd321",
  //     marca: "Chevrolet",
  //     modelo: "Ultra Fast",
  //     patente: "HD321DS",
  //     año: 2020,
  //     capacidad: 25
  //   }
  // ]

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Eliminar vehiculo?",
      text: "Esta acción es irreversible",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(res => {
      if(res.isConfirmed){
        console.log(id)
        // DELETE a DB con ID
      }
      return
    })
  }

  return(
    <div className="gestion-vehiculos">
      <div className="gestion-vehiculos--title">
        <h3>Gestión de vehículos</h3>
        <p>Administra tu flota de vehículos de manera eficiente</p>
      </div>
      <div className='agregar-vehiculo--btn-container'>
        <button className='agregar-vehiculo--btn' onClick={() => setAgregarVehiculoModal(true)}>+ Agregar Vehiculo</button>
      </div>
      <div className="gestion-vehiculos--list">
        <table className="tabla-vehiculos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Patente</th>
              <th>Año</th>
              <th>Capacidad (KG)</th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              vehiculos.map((v) => (
                <tr key={v.idvehiculos}>
                  <td>{v.idvehiculos}</td>
                  <td>{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.patente}</td>
                  <td>{v.año}</td>
                  <td>{v.capacidadkg}</td>
                  <td className='gestionar-vehiculos-table--action-btns'>
                    <button onClick={() => {handleDelete(v.idvehiculos)}}>Eliminar</button>
                    <button onClick={() => {setVehiculoSeleccionadoID(v.idvehiculos)}}>Editar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        vehiculoSeleccionadoID !== 0 &&
        <EditarVehiculoConductorModal 
          esVehiculo={true}
          elemento={vehiculos.filter(c => c.idvehiculos == vehiculoSeleccionadoID)[0]}
          setElemento={setVehiculoSeleccionadoID}
        />      
      }
      {
        agregarVehiculoModal &&
        <EditarVehiculoConductorModal
          esVehiculo={true}
          elemento={{}}
          setElemento={setAgregarVehiculoModal}
          esNuevoElemento={true}
        />
      }
    </div>
  )
}