import React from 'react';
// import './HomePage.css'; // Import your CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <header>
        <nav>
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <img src="hero-banner.jpg" alt="Hero banner image" />
          <h1>Welcome to Your Website!</h1>
          <p>A tagline summarizing your website's value proposition.</p>
          <button className="btn">Get Started</button>
        </section>

        <section className="features">
          <h2>Our Key Features</h2>
          {/* <div className="feature-cards">
            <FeatureCard icon="feature1-icon.png" title="Feature 1">
              <p>A brief description of Feature 1 and its benefits.</p>
            </FeatureCard>
            <FeatureCard icon="feature2-icon.png" title="Feature 2">
              <p>A brief description of Feature 2 and its benefits.</p>
            </FeatureCard>
          </div> */}
        </section>

        <section className="testimonials">
          <h2>What People Are Saying</h2>
          <p>"This website has been a game-changer for me!" - John Doe</p>
        </section>

        <section className="content">
          <h2>Latest from Our Blog</h2>
          <article>
            <h3>
              <a href="#">Blog post title</a>
            </h3>
            <p>A short excerpt from your blog post.</p>
            <a href="#">Read More</a>
          </article>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Your Website Name</p>
        <a href="#">Contact Us</a>
        <ul className="social-media">
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;

// FeatureCard Component (Optional)
// const FeatureCard = ({ icon, title, children }) => {
//   return (
//     <div className="card">
//       <img src={icon} alt={title + ' icon'} />
//       <h3>{title}</h3>
//       {children}
//     </div>
//   );
// };
