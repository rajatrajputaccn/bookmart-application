import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span>Bookmart</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/books">Shop books</NavLink>
          <NavLink to="/reading-list">My reading list</NavLink>
          <NavLink to="/manage-books">Manage inventory</NavLink>
        </nav>

        <Link to="/reading-list" className="reading-shortcut">
          <span>♡</span> Reading list
        </Link>
      </div>
    </header>
  )
}

export default Navbar