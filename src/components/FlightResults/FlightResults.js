import React from 'react';

const FlightResults = ({ results, formatDuration, loading }) => {
  
  return (
    <ul>
      {loading ? (
        <li>Loading...</li>
      ) : (
        results.map((flight, index) => (
          <li key={index}>
            {flight.itineraries.map((itinerary, index) => (
              <div key={index}>
                <h3>Itinerary {index + 1}</h3>
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
