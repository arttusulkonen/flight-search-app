import React from 'react';
import './HomePage.scss';

const HomePage = () => {
  return (
    <main className="homepage">
      <section className="homepage__search-section">
        <div className="homepage__container container">
          <h2 className="homepage__title">Find Your Next Adventure</h2>
          <form className="homepage__form">
            <div className="homepage__form-group">
              <label htmlFor="departure" className="homepage__label">Departure City</label>
              <input type="text" id="departure" className="homepage__input" placeholder="Enter city" />
            </div>
            <div className="homepage__form-group">
              <label htmlFor="budget" className="homepage__label">Maximum Budget</label>
              <input type="number" id="budget" className="homepage__input" placeholder="Enter budget" />
            </div>
            <button type="submit" className="homepage__button">Search Flights</button>
          </form>
        </div>
      </section>
      <section className="homepage__info-section">
        <div className="homepage__container container">
          <h3 className="homepage__info-title">How it works</h3>
          <p className="homepage__info-text">
            Simply enter your departure city and your maximum budget, and we'll find the best flight routes within your budget!
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
