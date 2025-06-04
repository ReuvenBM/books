import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onBack() {
        navigate('/book')
    }
    function pageCounter(pageCount){
        if(pageCount>=500) return "Serious Reading"
        if(pageCount>=200) return "Descent Reading"
        return "Light Reading"
    }

    function publishedDater(publishedDate){
        const year = new Date().getFullYear()
        const gap = year-publishedDate
        if(gap <= 1) return "New"
        if(gap >= 10) return "Vintage"
        return
    }
    function getPriceClass(amount) {
        if (amount > 150) return 'price high'
        if (amount < 20) return 'price low'
        return 'price'
}



    console.log('Render', params)
    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <h1>Price: <span className={getPriceClass(book.listPrice.amount)}>{book.listPrice.amount}</span></h1>
           <div className="img-container">
                {book.listPrice.isOnSale && <div className="on-sale">On Sale</div>}
                <img src={book.thumbnail} alt="book cover" />
            </div>

            <section className="book-meta">
                <span>{pageCounter(book.pageCount)}</span>
                <span>{publishedDater(book.publishedDate)}</span>
            </section>



            <button onClick={onBack}>Back</button>
            <section>
                <Link to={`/book/${book.prevBookId}`}><button>Prev Book</button></Link>
                <Link to={`/book/${book.nextBookId}`}><button>Next Book</button></Link>
            </section>
        </section>
    )
}