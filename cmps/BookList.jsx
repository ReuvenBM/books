const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="btns">
                        <div className="img-container">
                            {book.listPrice.isOnSale && <div className="on-sale">On Sale</div>}
                            <img className="book-img" src={book.thumbnail} alt="book cover" />
                        </div>
                        <button onClick={() => onRemoveBook(book.id)}> Remove</button>
                        <Link to={`/book/${book.id}`}><button >Details</button></Link>
                        <button >Edit</button>
                    </section>
                </li>
            )}
        </ul>
    )

}