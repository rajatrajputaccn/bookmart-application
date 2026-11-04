function Home() {
  return (
    <section className="page-container">
      <div className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>Find your next <span>great read.</span></h1>
          <p>
            Discover stories, ideas and knowledge waiting to be explored.
            Your next favourite book is just around the corner.
          </p>
          <a href="/books" className="primary-button">
            Explore collection <span>→</span>
          </a>
        </div>

        <div className="hero-art">
          <div className="hero-circle"></div>
          <div className="book-stack">
            <div className="book-cover book-one">
              <span>THE ART OF</span>
              <strong>READING</strong>
              <small>Every page is a new beginning.</small>
            </div>
            <div className="book-cover book-two">
              <span>EXPLORE</span>
              <strong>IDEAS.</strong>
            </div>
            <div className="book-cover book-three">
              <strong>STORIES</strong>
              <span>THAT STAY WITH YOU</span>
            </div>
          </div>
          <div className="floating-note">A book a day ✳</div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">A WORLD OF STORIES</span>
          <h2>Something for every reader.</h2>
        </div>
        <a href="/books" className="text-link">View all books →</a>
      </div>

      <div className="category-grid">
        {[
          ['01', 'Programming', 'Code, build and create'],
          ['02', 'Fiction', 'Stories beyond imagination'],
          ['03', 'Science', 'Understand the universe'],
          ['04', 'Business', 'Ideas that move you forward'],
          ['05', 'Self-Help', 'Become your best self']
        ].map(([number, name, description]) => (
          <a href={`/books?category=${encodeURIComponent(name)}`} className="category-card" key={name}>
            <span>{number}</span>
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <span className="category-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Home