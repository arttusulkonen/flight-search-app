import React from 'react';
import './FlightSearchForm.scss';

const FlightSearchForm = ({
  originSearch,
  handleOriginSearchChange,
  originSuggestions,
  handleSelectOrigin,
  destinationSearch,
  handleDestinationSearchChange,
  destinationSuggestions,
  handleSelectDestination,
  departureDate,
  returnDate,
  setDepartureDate,
  setReturnDate,
  directFlight,
  setDirectFlight,
  adults,
  setAdults,
  handleSearch,
  loadingResults,
}) => {
  return (
    <form className='flight-search-form' onSubmit={handleSearch}>
      <div className='flight-search-form__row'>
        <div className='flight-search-form-origin'>
          <input
            type='text'
            placeholder='Origin (e.g. HEL)'
            value={originSearch}
            onChange={handleOriginSearchChange}
            required
            className='flight-search-form__input'
          />
          {originSuggestions.length > 0 && (
            <ul className='select-origin'>
              {loadingResults ? (
                <li>Loading...</li>
              ) : (
                originSuggestions.map((airport, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectOrigin(airport.code)}
                  >
                    {airport.name} ({airport.code}) - {airport.city},{' '}
                    {airport.country}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Destination input */}
        <div className='flight-search-form-destination'>
          <input
            type='text'
            placeholder='Destination (e.g. PAR)'
            value={destinationSearch}
            onChange={handleDestinationSearchChange}
            required
            className='flight-search-form__input'
          />
          {destinationSuggestions.length > 0 && (
            <ul className='select-destination'>
              {loadingResults ? (
                <li>Loading...</li>
              ) : (
                destinationSuggestions.map((airport, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectDestination(airport.code)}
                  >
                    {airport.name} ({airport.code}) - {airport.city},{' '}
                    {airport.country}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Other inputs */}
        <div>
          <input
            type='date'
            placeholder='Departure Date'
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
            className='flight-search-form__input date'
          />
        </div>
        <div>
        <input
          type='date'
          placeholder='Return Date'
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
          className='flight-search-form__input date'
        />
        </div>
        <div>
        <input
          type='number'
          placeholder='Number of Adults'
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          min='1'
          required
          className='flight-search-form__input passengers'
        />
        </div>
        <button className='flight-search-form__button' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
};

export default FlightSearchForm;
