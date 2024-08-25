import React, { useEffect, useState } from 'react';
import airportsData from '../../bd/airports.json';
import { searchFlights } from '../../services/amadeusService';
import FlightResults from '../FlightResults/FlightResults';
import FlightSearchForm from '../FlightSearchForm/FlightSearchForm';

const HomePage = () => {
  const [airports, setAirports] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [directFlight, setDirectFlight] = useState(false);
  const [adults, setAdults] = useState(1);
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [originSearch, setOriginSearch] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const handleOriginSearchChange = (e) => {
    const value = e.target.value;
    setOriginSearch(value);

    setLoadingResults(true);

    if (value.length > 1) {
      setTimeout(() => {
        const filteredAirports = airports.filter((airport) =>
          airport.name.toLowerCase().includes(value.toLowerCase())
        );
        setOriginSuggestions(filteredAirports.slice(0, 10));

        setLoadingResults(false);
      }, 500);
    } else {
      setOriginSuggestions([]);
      setLoadingResults(false);
    }
  };

  const handleSelectOrigin = (code) => {
    setOrigin(code);
    setOriginSearch(code);
    setOriginSuggestions([]);
  };

  const handleDestinationSearchChange = (e) => {
    const value = e.target.value;
    setDestinationSearch(value);
  
    setLoadingResults(true);
  
    if (value.length > 1) {
      setTimeout(() => {
        const filteredAirports = airports.filter((airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase())
        );
        setDestinationSuggestions(filteredAirports.slice(0, 10));
        
        setLoadingResults(false);
      }, 500); 
    } else {
      setDestinationSuggestions([]);
      setLoadingResults(false);
    }
  };
  

  const handleSelectDestination = (code) => {
    setDestination(code);
    setDestinationSearch(code);
    setDestinationSuggestions([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await searchFlights(
        origin,
        destination,
        departureDate,
        returnDate,
        directFlight,
        adults,
        10
      );
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

  useEffect(() => {
    setAirports(airportsData);
  }, []);

  return (
    <div className='container'>
      <FlightSearchForm
        originSearch={originSearch}
        handleOriginSearchChange={handleOriginSearchChange}
        originSuggestions={originSuggestions}
        handleSelectOrigin={handleSelectOrigin}
        destinationSearch={destinationSearch}
        handleDestinationSearchChange={handleDestinationSearchChange}
        destinationSuggestions={destinationSuggestions}
        handleSelectDestination={handleSelectDestination}
        departureDate={departureDate}
        returnDate={returnDate}
        setDepartureDate={setDepartureDate}
        setReturnDate={setReturnDate}
        directFlight={directFlight}
        setDirectFlight={setDirectFlight}
        adults={adults}
        setAdults={setAdults}
        handleSearch={handleSearch}
        loadingResults={loadingResults}
      />

      {error && <p>{error}</p>}

      <FlightResults results={results} formatDuration={formatDuration} loading={loading}/>
    </div>
  );
};

export default HomePage;
