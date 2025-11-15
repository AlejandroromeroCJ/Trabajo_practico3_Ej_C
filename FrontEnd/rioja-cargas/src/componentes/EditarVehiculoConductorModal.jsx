import { useEffect, useState } from 'react'
import './estilos/EditarVehiculoConductorModal.css'
import { useDB } from '../contexto/databaseContext'
import Swal from 'sweetalert2'

export default function EditarVehiculoConductorModal({esVehiculo, elemento, setElemento, esNuevoElemento = false}){
  const [form, setForm] = useState({})

  const {
    actualizarVehiculo,
    actualizarConductor,
    agregarConductor,
    agregarVehiculo
  } = useDB();

  useEffect(() => {
    if(Object.keys(form).length !== 0) return
    if(esNuevoElemento){
      if(esVehiculo){
        setForm({
          marca: '',
          modelo: '',
          patente: '',
          año: '',
          capacidadkg: ''   
        })
        return
      }else{
        setForm({
          nombre: '',
          apellido: '',
          dni: '',
          licencia: '',
          vencimientolic: ''
        })
        return
      }
    }
  
    if(esVehiculo){
      setForm({
        idvehiculos: elemento.idvehiculos,
        marca: elemento.marca,
        modelo: elemento.modelo,
        patente: elemento.patente,
        año: elemento.año,
        capacidadkg: elemento.capacidadkg 
      })
      return
    }else{
      setForm({
        idconductores: elemento.idconductores,
        nombre: elemento.nombre,
        apellido: elemento.apellido,
        dni: elemento.dni,
        licencia: elemento.licencia,
        vencimientolic: elemento.vencimientolic.split('T')[0]
      })
      return
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = (e) => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handelCerrarModal = () => {
    if(esNuevoElemento){
      setElemento(false)
      return
    }
    setElemento(0)
  }

  const handleAddElement = async (e) => {
    e.preventDefault()
    if(esNuevoElemento){
      if(esVehiculo){
        // POST a DB vehiculos
        let add = await agregarVehiculo({nuevoVehiculo: form})
        if(add.error){
          Swal.fire({
            icon: "error",
            title: "Error agregando vehiculo",
            text: add.message
          })
          return
        }

        Swal.fire({
          icon: "success",
          title: "Vehiculo agregado!"
        }).then(() => {
          window.location.reload()
        })
        return
      }else{
        // POST a DB conductores
        let add = await agregarConductor({nuevoConductor: form})
        if(add.error){
          Swal.fire({
            icon: "error",
            title: "Error agregando conductor",
            text: add.message
          })
          return
        }

        Swal.fire({
          icon: "success",
          title: "Conductor agregado!"
        }).then(() => {
          window.location.reload()
        })
        return
      }
    }

    if(esVehiculo){
      // PUT a DB vehiculos
      let update = await actualizarVehiculo({
        id: form.idvehiculos,
        vehiculoActualizado: form
      })
      if(update.error){
        Swal.fire({
          icon: "error",
          title: "Error actualizando",
          text: update.message
        })
        return
      }

      Swal.fire({
        icon: "success",
        title: "Actualizado correctamente"
      }).then(() => {
        window.location.reload()
      })
     
    }else{
      console.log(form)
      let update = await actualizarConductor({
        id: form.idconductores,
        conductorActualizado: form
      })
      if(update.error){
        Swal.fire({
          icon: "error",
          title: "Error actualizando",
          text: update.message
        })
        return
      }

      Swal.fire({
        icon: "success",
        title: "Actualizado correctamente"
      }).then(() => {
        window.location.reload()
      })
      // PUT a DB conductores
    }
  }

  return(
    <div className="editar-vehiculo--modal">
      <div className='editar-vehiculo--modal-box'>
        <div className='close-editar-modal--btn' onClick={handelCerrarModal}>X</div>
        <h3>{esNuevoElemento ? 'Agregar': 'Editar'} {esVehiculo ? 'vehiculo' : 'conductor'}</h3>
        <form onSubmit={handleAddElement} className='editar-vehiculo--form'>
          {
            esVehiculo ?
            <>
              <input type="text" placeholder='Marca' required id='marca' value={form.marca} onChange={handleInputChange}/>
              <input type="text" placeholder='Modelo' required id='modelo' value={form.modelo} onChange={handleInputChange}/>
              <input type="text" placeholder='Patente' required id='patente' value={form.patente} onChange={handleInputChange}/>
              <input type="number" min={2000} max={2030} placeholder='Año' id='año' required value={form.año} onChange={handleInputChange}/>
              <input type="number" min={500} max={10000} placeholder='Capacidad' id='capacidadkg' required value={form.capacidadkg} onChange={handleInputChange}/>
            </>
            :
            <>
              <input type="text" placeholder='Nombre' required id='nombre' value={form.nombre} onChange={handleInputChange}/>
              <input type="text" placeholder='Apellido' required id='apellido' value={form.apellido} onChange={handleInputChange}/>
              <input type="number" placeholder='DNI' required id='dni' value={form.dni} onChange={handleInputChange}/>
              <input type="text" placeholder='Licencia' required id='licencia' value={form.licencia} onChange={handleInputChange}/>
              <input type="date" placeholder='Vencimiento' required id='vencimientolic' value={form.vencimientolic} onChange={handleInputChange}/>
            </>
          }
          <button>{esNuevoElemento ? 'Agregar': 'Editar'} {esVehiculo ? 'vehiculo' : 'conductor'}</button>
        </form>
      </div>
    </div>
  )
}