import React from 'react';

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
  loadingResults
}) => {
  return (
    <form onSubmit={handleSearch}>
      {/* Origin input */}
      <input
        type='text'
        placeholder='Origin (e.g. HEL)'
        value={originSearch}
        onChange={handleOriginSearchChange}
        required
      />
      <ul>
        {loadingResults ? (
          <li>Loading...</li>
        ) : (
          originSuggestions.map((airport, index) => (
            <li key={index} onClick={() => handleSelectOrigin(airport.code)}>
              {airport.name} ({airport.code}) - {airport.city}, {airport.country}
            </li>
          ))
        )}
      </ul>

      {/* Destination input */}
      <input
        type='text'
        placeholder='Destination (e.g. PAR)'
        value={destinationSearch}
        onChange={handleDestinationSearchChange}
        required
      />
      <ul>
        {destinationSuggestions.map((airport, index) => (
          <li key={index} onClick={() => handleSelectDestination(airport.code)}>
            {airport.name} ({airport.code}) - {airport.city}, {airport.country}
          </li>
        ))}
      </ul>

      {/* Other inputs */}
      <input
        type='date'
        placeholder='Departure Date'
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        required
      />
      <input
        type='date'
        placeholder='Return Date'
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        required
      />
      <label>
        <input
          type='checkbox'
          checked={directFlight}
          onChange={(e) => setDirectFlight(e.target.checked)}
        />
        Direct Flight
      </label>
      <input
        type='number'
        placeholder='Number of Adults'
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
        min='1'
        required
      />
      <button type='submit'>Search Flights</button>
    </form>
  );
};

export default FlightSearchForm;
