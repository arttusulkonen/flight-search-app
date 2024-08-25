import React, { useState } from 'react';
import { searchFlights } from '../../services/amadeusService';

const HomePage = () => {
  const [origin, setOrigin] = useState('');  
  const [destination, setDestination] = useState(''); 
  const [departureDate, setDepartureDate] = useState(''); 
  const [returnDate, setReturnDate] = useState('');
  const [directFlight, setDirectFlight] = useState(false);
  const [adults, setAdults] = useState(1); 
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(''); 

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await searchFlights(origin, destination, departureDate, returnDate, directFlight, adults, 10); 
      setResults(data.data);  
    } catch (error) {
      setError('Error fetching flight data');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/P?T(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = match[1] ? `${match[1]}h` : '';
    const minutes = match[2] ? `${match[2]}min` : '';
    return `${hours} ${minutes}`.trim();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Origin (e.g. HEL)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination (e.g. PAR)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
        <input 
          type="date"
          placeholder="Return Date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={directFlight}
            onChange={(e) => setDirectFlight(e.target.checked)}
          />
          Direct Flight
        </label>
        <input
          type="number"
          placeholder="Number of Adults"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Search Flights</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {results.map((flight, index) => (
          <li key={index}>
            {flight.itineraries.map((itinerary, index) => (
              <div key={index}>
                <h3>Itinerary {index + 1}</h3>
                <p>Price: {flight.price.total}</p>
                {/* for duration I get this data PT2H45M */}
                 <p>Duration: {formatDuration(itinerary.duration)}</p>
                <p>{itinerary.segments.map((segment, index) => (
                  <p key={index}>
                    <p>Departure: {segment.departure.iataCode}</p>
                    <p>Arrival: {segment.arrival.iataCode}</p>
                  </p>
                ))}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
