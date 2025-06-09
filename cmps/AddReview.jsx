export function AddReview() {
  return (
    <section className="review">
      <h2>Add Review</h2>
      <form className="review-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input id="rating" name="rating" type="number" />
        </div>

        <div className="form-group">
          <label htmlFor="readAt">Read At</label>
          <input id="readAt" name="readAt" type="date" />
        </div>

        <button className="submit-button">Submit</button>
      </form>
    </section>
  );
}
