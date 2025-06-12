import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addGoogleBook
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then(books => {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            books = books.filter(book => regex.test(book.title))
        }
        if (filterBy.minPrice) {
            books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
        }
        return books
    })
}


function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0) {
    return {
        title,
        price,
        description: '',
        thumbnail: '',
        listPrice: {
            amount: price,
            currencyCode: 'USD',
            isOnSale: false,
        }
    }
}


function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}


function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nxtBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nxtBookId = nxtBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = []
    for (let i = 0; i < 20; i++) {
      const book = {
        id: makeId(),
        title: makeLorem(2),
        subtitle: makeLorem(4),
        authors: [makeLorem(1)],
        publishedDate: getRandomIntInclusive(1950, 2025),
        description: makeLorem(20),
        pageCount: getRandomIntInclusive(20, 600),
        categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `https://coding-academy.org/books-photos/${i + 1}.jpg`,
        language: "en",
        listPrice: {
          amount: getRandomIntInclusive(80, 500),
          currencyCode: "EUR",
          isOnSale: Math.random() > 0.7
        },
        reviews:[]
      }
      books.push(book)
    }
    saveToStorage(BOOK_KEY, books) 
  }
}



function _createBook(title, price = 100) {
    const book = getEmptyBook(title, price)
    book.id = makeId()
    return book
}

function addGoogleBook(googleBook) {
  const imageLinks = googleBook.volumeInfo.imageLinks || {}

  const newBook = {
    id: makeId(),
    title: googleBook.volumeInfo.title || '',
    subtitle: googleBook.volumeInfo.subtitle || '',
    authors: googleBook.volumeInfo.authors || [],
    publishedDate: googleBook.volumeInfo.publishedDate || '',
    description: googleBook.volumeInfo.description || '',
    pageCount: googleBook.volumeInfo.pageCount || 0,
    categories: googleBook.volumeInfo.categories || [],
    thumbnail: imageLinks.thumbnail || '',
    language: googleBook.volumeInfo.language || 'en',
    listPrice: {
      amount: getRandomIntInclusive(50, 250),
      currencyCode: 'USD',
      isOnSale: false
    },
    reviews: []
  }

  return query().then(books => {
    const isExist = books.some(book => book.title === newBook.title)
    if (isExist) return Promise.reject('Book already exists')

    books.push(newBook)
    saveToStorage(BOOK_KEY, books)
    return Promise.resolve(newBook)
  })
}
