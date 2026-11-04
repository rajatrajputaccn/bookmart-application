import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api/api'

const categories = [
  'All',
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

function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('query') || ''
  const selectedCategory = searchParams.get('category') || 'All'

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await api.get('/books')
        setBooks(response.data)
      } catch {
        setError('Unable to load books. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const filteredBooks = books.filter((book) => {
    const matchesQuery =
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      book.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesQuery && matchesCategory
  })

  const updateQuery = (value) => {
    const params = new URLSearchParams(searchParams)

    if (value.trim()) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    setSearchParams(params)
  }

  const updateCategory = (category) => {
    const params = new URLSearchParams(searchParams)

    if (category === 'All') {
      params.delete('category')
    } else {
      params.set('category', category)
    }

    setSearchParams(params)
  }

  return (
    <section className="page-container">
      <div className="catalogue-header">
        <div>
          <h1 className="page-title">All books</h1>
        </div>

        <span className="book-count">
          {filteredBooks.length} books
        </span>
      </div>

      <div className="catalogue-toolbar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />

        <div className="catalogue-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'selected' : ''}
              onClick={() => updateCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="status-message">Loading books...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && filteredBooks.length > 0 && (
        <div className="book-grid catalogue-grid">
          {filteredBooks.map((book) => (
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
                <span className={`stock-status ${book.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {book.stockQuantity > 0 ? 'In stock' : 'Out of stock'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filteredBooks.length === 0 && (
        <div className="empty-state">
          <h2>No books found</h2>
          <p>Try another search or category.</p>
          <button
            onClick={() => setSearchParams({})}
            className="clear-filters"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}

export default Books