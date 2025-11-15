import { Navigate } from "react-router-dom";
import GestionConductores from "../componentes/GestionConductores";
import GestionVehiculos from "../componentes/GestionVehiculos";
import GestionViajes from "../componentes/GestionViajes";
import Header from "../componentes/Header";
import Hero from "../componentes/Hero";
import { useDB } from "../contexto/databaseContext";

export default function Home(){

  const { isLoggedIn } = useDB();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return(
    <>
      <Header/>
      <Hero/>
      <GestionVehiculos/>
      <GestionConductores/>
      <GestionViajes/>
    </>
  )
}