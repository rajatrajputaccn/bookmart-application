import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/api'

function BookDetails() {
  const { id } = useParams()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`)
        setBook(response.data)
      } catch {
        setError('Book not found or could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const addToReadingList = async () => {
    setMessage('')

    try {
      await api.post(`/reading-list/${id}`)
      setMessage('Book added to your reading list.')
    } catch (error) {
      const response = error.response

      if (response?.status === 409) {
        setMessage('This book is already in your reading list.')
      } else if (response?.status === 400) {
        setMessage('Your reading list already has 10 books.')
      } else {
        setMessage(
          response?.data?.error || 'Could not add this book. Please try again.'
        )
      }
    }
  }

  if (loading) {
    return <div className="page-container status-message">Loading book details...</div>
  }

  if (error) {
    return (
      <div className="page-container">
        <p className="error-message">{error}</p>
        <Link to="/books" className="back-link">← Back to books</Link>
      </div>
    )
  }

  return (
    <section className="page-container">
      <Link to="/books" className="back-link">← Back to books</Link>

      <div className="details-layout">
        <div className="details-cover">
          <img
            src={`https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`}
            alt={`Cover of ${book.title}`}
            onError={(event) => {
              event.currentTarget.style.display = 'none'
              event.currentTarget.nextElementSibling.style.display = 'flex'
            }}
          />

          <div className="cover-placeholder details-placeholder">
            <span>{book.category}</span>
            <strong>{book.title}</strong>
            <small>{book.author}</small>
          </div>
        </div>

        <div className="details-information">
          <span className="book-category">{book.category}</span>

          <h1>{book.title}</h1>

          <p className="details-author">by {book.author}</p>

          <div className="details-price">
            ₹{Number(book.price).toFixed(2)}
          </div>

          <p className="details-stock">
            {book.stockQuantity > 0
              ? `${book.stockQuantity} copies available`
              : 'Currently out of stock'}
          </p>

          <div className="details-divider" />

          <h3>About this book</h3>

          <p className="details-description">
            {book.description || 'No description available for this book.'}
          </p>

          <button
            className="add-reading-button"
            onClick={addToReadingList}
          >
            Add to reading list
          </button>

          {message && <p className="details-message">{message}</p>}
        </div>
      </div>
    </section>
  )
}

export default BookDetails