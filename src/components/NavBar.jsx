import '../assets/styles/navBar.scss';
import { NavLink } from "react-router-dom";

function NavBar(){

  return (
    <nav className='NavBar'>
        <NavLink to={'/'} end>Inicio</NavLink>
        <NavLink to={'/productos'}>Productos</NavLink>
    </nav>
  )
}

export default NavBar;