import { useState } from "react";
import './estilos/LoginPage.css'
import { useDB } from "../contexto/databaseContext";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const { login, isLoggedIn } = useDB();

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value
    })
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginForm)
    let fetchLogin = await login({loginData: loginForm})
    if(fetchLogin.error){
      Swal.fire({
        icon: "error",
        title: "Error iniciando sesión",
        text: fetchLogin.message
      })
      return
    }
    console.log(fetchLogin)

    // Acá vas a hacer el fetch/login al backend
  };

  if(isLoggedIn){
    return <Navigate to="/home" replace></Navigate>
  }

  return (
    <div className="login-page">
      <div className="login-page--login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={loginForm.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
