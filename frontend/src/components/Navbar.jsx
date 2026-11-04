import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">B</span>
          <span>bookmart<span className="brand-dot">.</span></span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/books">Explore Books</NavLink>
          <NavLink to="/reading-list">Reading List</NavLink>
          <NavLink to="/manage-books">Manage Books</NavLink>
        </nav>

        <Link to="/books" className="navbar-button">
          Browse collection <span>↗</span>
        </Link>
      </div>
    </header>
  )
}

export default Navbar