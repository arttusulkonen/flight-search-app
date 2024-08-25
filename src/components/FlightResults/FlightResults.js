import React from 'react';
import './FlightResults.scss';

const FlightResults = ({ results, formatDuration, loading }) => {
  
  return (
    <ul className="flight-results">
      {loading ? (
        <li>Loading...</li>
      ) : (
        results.map((flight, index) => (
          <li key={index} className="flight-results__item">
            {flight.itineraries.map((itinerary, index) => (
              <div key={index}>
                <p>Price: {flight.price.total}</p>
                <p>Duration: {formatDuration(itinerary.duration)}</p>
                <div>
                  {itinerary.segments.map((segment, index) => (
                    <div key={index}>
                      <p>Departure: {segment.departure.iataCode}</p>
                      <p>Arrival: {segment.arrival.iataCode}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </li>
        ))
      )}
    </ul>
  );
};

export default FlightResults;
