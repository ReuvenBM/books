import { googleBookService } from '../services/googleBook.service.js'

const { useState, useEffect } = React

export function AddBook() {
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
          </li>
        ))}
      </ul>
    </section>
  )
}
