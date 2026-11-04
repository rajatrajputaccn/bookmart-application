
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

function ReadingList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [removingId, setRemovingId] = useState(null)

  const fetchReadingList = async () => {
    try {
      const response = await api.get('/reading-list')
      setItems(response.data)
    } catch {
      setError('Could not load your reading list.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReadingList()
  }, [])

  const removeBook = async (bookId) => {
    setRemovingId(bookId)
    setError('')

    try {
      await api.delete(`/reading-list/${bookId}`)
      setItems(current => current.filter(item => item.book.id !== bookId))
    } catch (error) {
      setError(error.response?.data?.error || 'Could not remove this book.')
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <main className="page-container reading-page">
      <header className="reading-header">
        <div>
          <h1>My reading list</h1>
        </div>

        <div className="reading-count">
          <strong>{items.length}</strong>
          <span>of 10 books</span>
        </div>
      </header>

      {error && <p className="reading-error">{error}</p>}

      {loading ? (
        <p className="reading-message">Loading your books...</p>
      ) : items.length === 0 ? (
        <div className="reading-empty">
          <div className="reading-empty-symbol">♡</div>
          <h2>A little room for a good book.</h2>
          <p>Your reading list is empty. Browse the collection and save something interesting.</p>
          <Link to="/books" className="reading-browse-button">
            Explore books
          </Link>
        </div>
      ) : (
        <section className="reading-books">
          {items.map(item => (
            <article className="reading-book" key={item.id}>
              <Link
                to={`/books/${item.book.id}`}
                className="reading-book-cover"
              >
                <BookCover title={item.book.title} />
              </Link>

              <div className="reading-book-details">
                <span className="reading-book-category">
                  {item.book.category}
                </span>

                <Link
                  to={`/books/${item.book.id}`}
                  className="reading-book-title"
                >
                  {item.book.title}
                </Link>

                <p className="reading-book-author">
                  by {item.book.author}
                </p>

                <p className="reading-book-description">
                  {item.book.description || 'A book waiting to be discovered.'}
                </p>

                <div className="reading-book-bottom">
                  <strong>₹{Number(item.book.price).toFixed(2)}</strong>

                  <button
                    className="reading-remove-button"
                    onClick={() => removeBook(item.book.id)}
                    disabled={removingId === item.book.id}
                  >
                    {removingId === item.book.id ? 'Removing...' : 'Remove from list'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {!loading && items.length > 0 && (
        <div className="reading-footer">
          <span>{10 - items.length} {10 - items.length === 1 ? 'spot' : 'spots'} left on your list</span>
          <Link to="/books">Find your next read →</Link>
        </div>
      )}
    </main>
  )
}

function BookCover({ title }) {
  const [failed, setFailed] = useState(false)

  const coverUrl = `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg?default=false`

  return failed ? (
    <div className="reading-cover-placeholder">
      <span>BOOKMART</span>
      <strong>{title}</strong>
    </div>
  ) : (
    <img
      src={coverUrl}
      alt={title}
      onError={() => setFailed(true)}
    />
  )
}

export default ReadingList
