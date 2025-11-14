import { useEffect, useState } from 'react'
import './estilos/EditarVehiculoConductorModal.css'

export default function EditarVehiculoConductorModal({esVehiculo, elemento, setElemento, esNuevoElemento = false}){
  const [form, setForm] = useState({})

  useEffect(() => {
    if(Object.keys(form).length !== 0) return
    if(esNuevoElemento){
      if(esVehiculo){
        setForm({
          marca: '',
          modelo: '',
          patente: '',
          año: '',
          capacidad: ''   
        })
        return
      }else{
        setForm({
          nombre: '',
          apellido: '',
          dni: '',
          licencia: '',
          vencimiento: ''
        })
        return
      }
    }
  
    if(esVehiculo){
      setForm({
        id: elemento.id,
        marca: elemento.marca,
        modelo: elemento.modelo,
        patente: elemento.patente,
        año: elemento.año,
        capacidad: elemento.capacidad   
      })
      return
    }else{
      setForm({
        id: elemento.id,
        nombre: elemento.nombre,
        apellido: elemento.apellido,
        dni: elemento.dni,
        licencia: elemento.licencia,
        vencimiento: elemento.vencimiento
      })
      return
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddElement = (e) => {
    e.preventDefault()
    if(esNuevoElemento){
      if(esVehiculo){
        console.log('Vehiculo agregar')
        console.log(form)
        // POST a DB vehiculos
      }else{
        console.log('Conductor agregar')
        console.log(form)
        // POST a DB conductores
      }
    }

    if(esVehiculo){
      // PUT a DB vehiculos
    }else{
      // PUT a DB conductores
    }
  }

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
              <input type="number" min={5} max={60} placeholder='Capacidad' id='capacidad' required value={form.capacidad} onChange={handleInputChange}/>
            </>
            :
            <>
              <input type="text" placeholder='Nombre' required id='nombre' value={form.nombre} onChange={handleInputChange}/>
              <input type="text" placeholder='Apellido' required id='apellido' value={form.apellido} onChange={handleInputChange}/>
              <input type="number" placeholder='DNI' required id='dni' value={form.dni} onChange={handleInputChange}/>
              <input type="text" placeholder='Licencia' required id='licencia' value={form.licencia} onChange={handleInputChange}/>
              <input type="date" placeholder='Vencimiento' required id='vencimiento' value={form.vencimiento} onChange={handleInputChange}/>
            </>
          }
          <button>{esNuevoElemento ? 'Agregar': 'Editar'} {esVehiculo ? 'vehiculo' : 'conductor'}</button>
        </form>
      </div>
    </div>
  )
}