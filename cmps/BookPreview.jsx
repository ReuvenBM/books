
export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2 className="book-title">Title: {book.title}</h2>
            <h4>Price: {book.listPrice.amount}</h4>
        </article>
    )
}
