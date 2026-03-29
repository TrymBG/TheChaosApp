import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">The Chaos App</NavLink>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/algorithms" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Algorithms
        </NavLink>
      </div>
    </nav>
  )
}
