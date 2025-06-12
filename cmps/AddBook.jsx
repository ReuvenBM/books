import { googleBookService } from '../services/googleBook.service.js'
import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function AddBook( {onBookAdded}) {
  const [filterBy, setFilterBy] = useState({ txt: '' })
  const [results, setResults] = useState([])

  function handleChange(ev) {
    const { name, value } = ev.target
    setFilterBy(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!filterBy.txt) {
      setResults([])
      return
    }

    const debounceTimer = setTimeout(() => {
      googleBookService.query(filterBy.txt)
        .then(setResults)
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [filterBy.txt])

  function onAddBook(googleBook) {
  bookService.addGoogleBook(googleBook)
    .then(() => {
      console.log('Book added!')
      onBookAdded()
    })
    .catch(err => {
      console.log('Could not add book:', err)
    })
}


  return (
    <section className="book-add">
      <h2>Add Book from Google</h2>
      <input
        type="text"
        name="txt"
        value={filterBy.txt}
        onChange={handleChange}
        placeholder="Search for a book..."
      />

      <ul className="search-results">
        {results.map(book => (
          <li key={book.id}>
            {book.volumeInfo.title}
            <button onClick={() => onAddBook(book)}>➕</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
