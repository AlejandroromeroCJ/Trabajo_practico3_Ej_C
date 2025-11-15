import { createContext, useContext, useEffect, useState } from "react"

const DBContext = createContext()
const apiURL = import.meta.env.VITE_URL;

export const useDB = () => useContext(DBContext)

export default function DBProvider({ children }) {

  const [JWT, setJWT] = useState(localStorage.getItem('jwt'))
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  
  useEffect(() => {
    const verificarJWT = async () => {
      // si no hay token
      if (!JWT) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch(`${apiURL}/auth/isLoggedIn`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        });


        // si el token es inválido o el backend responde error
        if (!res.ok) {
          localStorage.removeItem("jwt");
          setJWT(null);
          setIsLoggedIn(false);
          return;
        }

        const data = await res.json();

        // ACA es donde cambia la condición
        if (data.success === true && data.loggedIn === true) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
          setJWT(null);
        }

      } catch (err) {
        console.error("Error verificando JWT:", err);
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
        setJWT(null);
      }
    };

    verificarJWT();
  }, [JWT]);

  
  // ============ VEHICULOS ============

  const obtenerVehiculos = async () => {
    try{
      let peticion = await fetch(`${apiURL}/vehiculos`)
      let data = await peticion.json()      
      return data
    }catch(err){
      return {
        error: true,
        message: err
      }
    }
  }

  const agregarVehiculo = async ({
    nuevoVehiculo
  }) => {
    try {
      const res = await fetch(`${apiURL}/vehiculos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVehiculo),
      });

      if (!res.ok) {
        throw new Error("Error al agregar el vehiculo");
      }

      const data = await res.json();
      return data;

    } catch (error) {;
      return {
        error: true,
        message: error
      };
    }
  }

  const actualizarVehiculo = async ({id, vehiculoActualizado}) => {
    try {
      const res = await fetch(`${apiURL}/vehiculos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehiculoActualizado),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el vehículo");
      }

      const data = await res.json();
      return data;

    } catch (error) {
      return {
        error: true,
        message: error
      };
    }
  }
  
  const eliminarVehiculo = async (id) => {
    try{
      const peticion = await fetch(`${apiURL}/vehiculos/${id}`, {
        method: "DELETE"
      })

      if(!peticion.ok){
        throw new Error("Error eliminando el vehiculo")
      }

      const data = await peticion.json();
      return data;

    }catch(err){
      return err
    }
  }

  // ============ CONDUCTOR ============

  const obtenerConductores = async () => {
    try{
      let peticion = await fetch(`${apiURL}/conductores`)
      let data = await peticion.json()      
      return data
    }catch(err){
      return {
        error: true,
        message: err
      }
    }
  }

  const agregarConductor = async ({
    nuevoConductor
  }) => {
    try {
      const res = await fetch(`${apiURL}/conductores/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoConductor),
      });

      if (!res.ok) {
        throw new Error("Error al agregar el conductor");
      }

      const data = await res.json();
      return data;

    } catch (error) {;
      return {
        error: true,
        message: error
      };
    }
  }

  const actualizarConductor = async ({id, conductorActualizado}) => {
    try {
      const res = await fetch(`${apiURL}/conductores/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conductorActualizado),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el conductor");
      }

      const data = await res.json();
      return data;

    } catch (error) {;
      return error;
    }
  }

  const eliminarConductor = async (id) => {
    try{
      const peticion = await fetch(`${apiURL}/conductor/${id}`, {
        method: "DELETE"
      })

      if(!peticion.ok){
        throw new Error("Error eliminando conductor")
      }

      const data = await peticion.json();
      return data;

    }catch(err){
      return err
    }
  }

  // ============ VIAJE ============

  const obtenerViajes = async() => {
    try{
      let peticion = await fetch(`${apiURL}/viajes`)
      let data = await peticion.json()      
      return data
    }catch(err){
      return {
        error: true,
        message: err
      }
    }
  }

  const agregarViaje = async ({
    nuevoViaje
  }) =>{
    try {
      const res = await fetch(`${apiURL}/viajes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoViaje),
      });

      if (!res.ok) {
        throw new Error("Error al agregar el viaje");
      }

      const data = await res.json();
      return data;

    } catch (error) {;
      return {
        error: true,
        message: error
      };
    }
  }

  const actualizarViaje = async ({id, viajeActualizado}) => {
    try {
      const res = await fetch(`${apiURL}/viajes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(viajeActualizado),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el viaje");
      }

      // Manejo seguro del JSON
      let data = null;
      try {
        data = await res.json();
      } catch {
        // si no hay body, no pasa nada
      }

      return data || { success: true };

    } catch (error) {
      return error;
    }
  }

  

  // ============ AUTH ============

  const login = async ({loginData}) => {
    try{
      let peticion = await fetch(`${apiURL}/auth/login`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })

      const data = await peticion.json()
      if(data.errores){
        throw new Error(data.errores[0].msg)
      }

      localStorage.setItem('jwt', data.token)
      setJWT(data.token)
      return data


    }catch(err){
      return {
        error:true,
        message: err
      }
    }
  }


  return (
    <DBContext.Provider
      value={{
        obtenerVehiculos,
        obtenerConductores,
        obtenerViajes,
        actualizarVehiculo,
        actualizarConductor,
        actualizarViaje,
        eliminarVehiculo,
        eliminarConductor,
        agregarConductor,
        agregarVehiculo,
        agregarViaje,
        login,
        isLoggedIn
      }}
    >
      {children}
    </DBContext.Provider>
  );
}
