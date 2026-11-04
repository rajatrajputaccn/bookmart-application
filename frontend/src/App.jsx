import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import ReadingList from './pages/ReadingList'
import ManageBooks from './pages/ManageBooks'

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/reading-list" element={<ReadingList />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Made by Rajat Rajput (Java FDE Cohort 3)</p>
      </footer>
    </div>
  )
}

export default App