
import { useEffect, useState } from 'react'
import api from '../api/api'

const emptyForm = {
  title: '',
  author: '',
  category: '',
  price: '',
  stockQuantity: '',
  description: ''
}

function ManageBooks() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books')
      setBooks(response.data)
      setError('')
    } catch {
      setError('Could not load the inventory.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    const payload = {
      ...form,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity)
    }

    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, payload)
        setMessage('Book updated successfully.')
      } else {
        await api.post('/books', payload)
        setMessage('Book added successfully.')
      }

      resetForm()
      await fetchBooks()
    } catch (error) {
      const data = error.response?.data
      setError(
        typeof data === 'object'
          ? Object.values(data).join(' ')
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setSaving(false)
    }
  }

  const editBook = (book) => {
    setEditingId(book.id)
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      stockQuantity: book.stockQuantity,
      description: book.description || ''
    })
    setError('')
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteBook = async (book) => {
    if (!window.confirm(`Delete "${book.title}" from the inventory?`)) return

    setError('')
    setMessage('')

    try {
      await api.delete(`/books/${book.id}`)
      setBooks(current => current.filter(item => item.id !== book.id))
      setMessage('Book deleted successfully.')

      if (editingId === book.id) resetForm()
    } catch (error) {
      setError(error.response?.data?.error || 'Could not delete this book.')
    }
  }

  return (
    <main className="page-container manage-page">
      <div className="manage-heading">
        <div>
          <h1>Manage inventory</h1>
        </div>
      </div>

      <section className="manage-form-section">
        <div className="manage-section-heading">
          <div>
            <h2>{editingId ? 'Edit book' : 'Add a new book'}</h2>
          </div>
          {editingId && (
            <button className="manage-cancel-link" onClick={resetForm}>
              Cancel editing
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="manage-form-grid">
            <label className="manage-field">
              <span>Book title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter the book title"
                required
              />
            </label>

            <label className="manage-field">
              <span>Author</span>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter author's name"
                required
              />
            </label>

            <label className="manage-field">
              <span>Category</span>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Fiction, Science"
                required
              />
            </label>

            <label className="manage-field">
              <span>Price</span>
              <div className="manage-price-input">
                <span>₹</span>
                <input
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
            </label>

            <label className="manage-field">
              <span>Stock quantity</span>
              <input
                name="stockQuantity"
                type="number"
                min="0"
                step="1"
                value={form.stockQuantity}
                onChange={handleChange}
                placeholder="Number of copies"
                required
              />
            </label>

            <label className="manage-field manage-description-field">
              <span>Description <small>Optional</small></span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="A short description of the book..."
                rows="3"
              />
            </label>
          </div>

          {error && <p className="manage-feedback error">{error}</p>}
          {message && <p className="manage-feedback success">{message}</p>}

          <div className="manage-form-footer">
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Save changes' : 'Add book to inventory'}
            </button>
          </div>
        </form>
      </section>

      <section className="inventory-section">
        <div className="inventory-heading">
          <h2>All books</h2>
          <span>{books.length} items</span>
        </div>

        {loading ? (
          <p className="inventory-message">Loading inventory...</p>
        ) : books.length === 0 ? (
          <p className="inventory-message">No books in the inventory yet.</p>
        ) : (
          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td>
                      <div className="inventory-title">{book.title}</div>
                      <div className="inventory-author">{book.author}</div>
                    </td>
                    <td>
                      <span className="inventory-category">{book.category}</span>
                    </td>
                    <td className="inventory-price">
                      ₹{Number(book.price).toFixed(2)}
                    </td>
                    <td>
                      <span className={`inventory-stock ${book.stockQuantity === 0 ? 'out-of-stock' : ''}`}>
                        {book.stockQuantity}
                      </span>
                    </td>
                    <td>
                      <div className="inventory-actions">
                        <button onClick={() => editBook(book)}>Edit</button>
                        <button className="delete-button" onClick={() => deleteBook(book)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default ManageBooks
