export const googleBookService = {
  query
}

const STORAGE_KEY = 'googleBooksCache'

function query(txt) {
  const cached = loadFromStorage()
  if (cached[txt]) {
    return Promise.resolve(cached[txt])
  }

  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const books = data.items || []
      cached[txt] = books
      saveToStorage(cached)
      return books
    })
}

function loadFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
