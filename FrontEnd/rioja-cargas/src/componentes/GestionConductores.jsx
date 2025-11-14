import { useState } from 'react'
import './estilos/GestionConductores.css'
import EditarVehiculoConductorModal from './EditarVehiculoConductorModal'
import Swal from 'sweetalert2'

export default function GestionConductores(){
  const [conductorSeleccionadoID, setConductorSeleccionadoID] = useState(0)
  const [agregarConductorModal, setAgregarConductorModal] = useState(false)
  
  const conductoresEjemplo = [
    {
      id: "abc123",
      nombre: "Juan",
      apellido: "Perez",
      dni: 21324124,
      licencia: "A-42124",
      vencimiento: "2001-05-24"
    }, 
    {
      id: "bcd321",
      nombre: "Ezequiel",
      apellido: "Zeballos",
      dni: 445123123,
      licencia: "B-21422",
      vencimiento: "2005-12-30"
    }
  ]

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Eliminar conductor?",
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
        <h3>Gestión de conductores</h3>
        <p>Administra tu flota de vehículos de manera eficiente</p>
      </div>
      <div className='agregar-vehiculo--btn-container'>
        <button className='agregar-vehiculo--btn' onClick={() => setAgregarConductorModal(true)}>+ Agregar Conductor</button>
      </div>
      <div className="gestion-vehiculos--list">
        <table className="tabla-vehiculos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Licencia</th>
              <th>Vencimiento</th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              conductoresEjemplo.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.apellido}</td>
                  <td>{c.dni}</td>
                  <td>{c.licencia}</td>
                  <td>{c.vencimiento}</td>
                  <td className='gestionar-vehiculos-table--action-btns'>
                    <button onClick={() => {handleDelete(c.id)}}>Eliminar</button>
                    <button onClick={() => {setConductorSeleccionadoID(c.id)}}>Editar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        conductorSeleccionadoID !== 0 &&
        <EditarVehiculoConductorModal 
          esVehiculo={false}
          elemento={conductoresEjemplo.filter(c => c.id == conductorSeleccionadoID)[0]}
          setElemento={setConductorSeleccionadoID}
        />
      }
      {
        agregarConductorModal &&
        <EditarVehiculoConductorModal
          esVehiculo={false}
          elemento={{}}
          setElemento={setAgregarConductorModal}
          esNuevoElemento={true}
        />
      }
    </div>
  )
}