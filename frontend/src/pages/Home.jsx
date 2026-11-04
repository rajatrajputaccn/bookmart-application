import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

const categories = [
  'Fiction',
  'Programming',
  'Science',
  'Business',
  'Self-Help'
]

function BookCover({ book }) {
  const [imageFailed, setImageFailed] = useState(false)

  const coverUrl = `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`

  return (
    <div className="book-cover-frame">
      {!imageFailed ? (
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="cover-placeholder">
          <span>{book.category}</span>
          <strong>{book.title}</strong>
          <small>{book.author}</small>
        </div>
      )}
    </div>
  )
}

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books')
        setBooks(response.data)
      } catch {
        setError('We could not load the book collection. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()

    if (query.trim()) {
      navigate(`/books?query=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/books')
    }
  }

  return (
    <div className="home-page">
      <section className="shop-intro">
        <div className="intro-copy">
          <h1>Good books.<br />Good company.</h1>
        </div>
      </section>

      <section className="search-section">
        <form className="book-search" onSubmit={handleSearch}>
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search by book title or author..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="category-section">

        <div className="category-links">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/books?category=${encodeURIComponent(category)}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <h2>New and noteworthy</h2>
          </div>

          <Link to="/books" className="view-all">
            Browse all books <span>→</span>
          </Link>
        </div>

        {loading && <p className="status-message">Loading our collection...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="book-grid">
            {books.slice(0, 4).map((book) => (
              <Link
                to={`/books/${book.id}`}
                className="book-card"
                key={book.id}
              >
                <BookCover book={book} />

                <div className="book-information">
                  <span className="book-category">{book.category}</span>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <strong>₹{Number(book.price).toFixed(2)}</strong>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="status-message">No books have been added yet.</p>
        )}
      </section>
    </div>
  )
}

export default Home