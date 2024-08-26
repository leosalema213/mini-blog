import { NavLink } from "react-router-dom";

import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>blog</span>
      </NavLink>
      <ul className={styles.link_list}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>Sobre</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>Logar</NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
