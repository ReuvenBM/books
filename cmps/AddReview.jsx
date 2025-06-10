import { bookService } from '../services/book.service.js'

export function AddReview({ bookId, onReviewAdded }) {

  function submitForm(ev) {
    ev.preventDefault()

    const fullName = ev.target.fullName.value
    const rating = +ev.target.rating.value
    const readAt = ev.target.readAt.value
    const review = { fullName, rating, readAt }

   bookService.get(bookId)
    .then(book => {
        if (!book.reviews) book.reviews = [] 
        book.reviews.push(review)
        return bookService.save(book)
    })
    .then(updatedBook => {
        console.log('Review added!')
        onReviewAdded(updatedBook) 
        ev.target.reset() 
  })
  }

  return (
    <section className="review">
      <h2>Add Review</h2>
      <form className="review-form" onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input id="rating" name="rating" type="number" min="1" max="5" />
        </div>

        <div className="form-group">
          <label htmlFor="readAt">Read At</label>
          <input id="readAt" name="readAt" type="date" max={new Date().toISOString().split('T')[0]}/>
        </div>

        <button className="submit-button">Submit</button>
      </form>
    </section>
  )
}
