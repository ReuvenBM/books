const { useState } = React

export function AddBook() {
  const [filterBy, setFilterBy] = useState({ txt: '' })

  function handleChange(ev) {
    const { name, value } = ev.target
    setFilterBy(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    console.log('Searching for:', filterBy.txt)
  }

  return (
    <section className="book-add">
      <h2>Add Book from Google</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="txt"
          value={filterBy.txt}
          onChange={handleChange}
          placeholder="Search for a book..."
        />
      </form>
    </section>
  )
}
