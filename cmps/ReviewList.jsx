import { bookService } from "../services/book.service.js";

export function ReviewList({ bookId, reviews, onReviewDeleted }) {
  function handleRemove(idx) {
    bookService
      .get(bookId)
      .then((book) => {
        book.reviews.splice(idx, 1)
        return bookService.save(book)
      })
      .then((updatedBook) => {
        onReviewDeleted(updatedBook);
        console.log("Review deleted!")
      })
      .catch((err) => {
        console.error("Failed to delete review:", err)
      });
  }
  if (!reviews || !reviews.length) {
    return <h2>No Reviews</h2>
  }

  return (
    <section>
      <table className="review-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Rating</th>
            <th>Read At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => (
            <tr key={idx}>
              <td>{review.fullName}</td>
              <td>{review.rating}</td>
              <td>{review.readAt}</td>
              <td>
                <button onClick={() => handleRemove(idx)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
