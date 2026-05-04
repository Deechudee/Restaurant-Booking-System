import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroBg from "../assets/main.jpeg";
import "../App.css";

const Home = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to VenusHub</h1>
            <p className="hero-subtitle">Discover exquisite dining experiences and reserve your table effortlessly</p>
            <div className="hero-cta">
              <Link to="/booking" className="btn btn-primary btn-large">Book a Table</Link>
              <Link to="/login" className="btn btn-secondary btn-large">View Menu</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="restaurant-info section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🍽️</div>
              <h3>Premium Dining</h3>
              <p>Experience fine dining with our curated menu of international cuisine in an elegant atmosphere.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Instant Booking</h3>
              <p>Secure your reservation in seconds. No waiting, no phone calls - just perfect timing.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Our world-class chefs create dishes using fresh, seasonal ingredients daily.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⭐</div>
              <h3>5-Star Reviews</h3>
              <p>Thousands of satisfied customers trust VenusHub for their special dining occasions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="featured-menu section">
        <div className="container">
          <h2 className="section-title">Featured Dishes</h2>
          <div className="menu-grid">
            <div className="menu-card">
              <div className="menu-emoji">🍗</div>
              <h4>Signature Biryani</h4>
              <p>Fragrant basmati rice with tender chicken and signature spices</p>
            </div>
            <div className="menu-card">
              <div className="menu-emoji">🥩</div>
              <h4>Grilled Steak</h4>
              <p>Perfectly seared premium cut with herb butter and truffle fries</p>
            </div>
            <div className="menu-card">
              <div className="menu-emoji">🍤</div>
              <h4>Garlic Shrimp</h4>
              <p>Jumbo prawns sautéed in garlic butter with lemon zest</p>
            </div>
            <div className="menu-card">
              <div className="menu-emoji">🍝</div>
              <h4>Truffle Pasta</h4>
              <p>Handmade fettuccine in creamy truffle sauce with mushrooms</p>
            </div>
            <div className="menu-card">
              <div className="menu-emoji">🍰</div>
              <h4>Chocolate Lava Cake</h4>
              <p>Warm molten chocolate center with vanilla ice cream</p>
            </div>
            <div className="menu-card">
              <div className="menu-emoji">🍹</div>
              <h4>Signature Cocktails</h4>
              <p>Crafted by our mixologists using fresh juices and premium spirits</p>
            </div>
          </div>
          <div className="menu-cta">
            <Link to="/login" className="btn btn-primary">Full Menu</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Dine?</h2>
          <p>Reserve your table now and enjoy an unforgettable evening</p>
          <Link to="/booking" className="btn btn-large btn-primary">Book Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>VenusHub 🍽️</h3>
              <p>Your premier restaurant reservation platform</p>
            </div>
            <div className="footer-links">
              <Link to="/booking">Book Table</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
            <div className="footer-contact">
              <p>📞 +1 (555) 123-4567</p>
              <p>📧 hello@venushub.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 VenusHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
