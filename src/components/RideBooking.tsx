import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import { ethers } from 'ethers';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

const RideBooking: React.FC = () => {
  const [pickup, setPickup] = useState<Location>({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState<Location>({ lat: 0, lng: 0 });
  const [price, setPrice] = useState<string>('0');
  const [availableDrivers, setAvailableDrivers] = useState<number>(0);
  const [activeRiders, setActiveRiders] = useState<number>(0);
  const [weatherImpact, setWeatherImpact] = useState<number>(1);
  const [trafficMultiplier, setTrafficMultiplier] = useState<number>(1);

  // Mock function to calculate price based on various factors
  const calculatePrice = () => {
    const basePrice = 10;
    const driverRiderRatio = availableDrivers / (activeRiders || 1);
    const ratioMultiplier = driverRiderRatio < 1 ? 1.5 : 1;
    
    const finalPrice = basePrice * ratioMultiplier * weatherImpact * trafficMultiplier;
    setPrice(finalPrice.toFixed(2));
  };

  useEffect(() => {
    // Mock data fetching
    const fetchExternalData = async () => {
      try {
        // These would be actual API calls in production
        setAvailableDrivers(0);
        setActiveRiders(1);
        setWeatherImpact(1.2); // Simulating bad weather
        setTrafficMultiplier(1.3); // Simulating heavy traffic
        calculatePrice();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExternalData();
  }, []);

  const handleBookRide = async () => {
    try {
      // This would interact with the smart contract in production
      console.log('Booking ride...');
      // Add blockchain interaction here
    } catch (error) {
      console.error('Error booking ride:', error);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 0,
    lng: 0
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book a Ride
      </Typography>

      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Market Conditions
          </Typography>
          <Typography>Available Drivers: {availableDrivers}</Typography>
          <Typography>Active Riders: {activeRiders}</Typography>
          <Typography>Weather Impact: {(weatherImpact - 1) * 100}%</Typography>
          <Typography>Traffic Impact: {(trafficMultiplier - 1) * 100}%</Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Estimated Price: ${price} ETH
          </Typography>
        </CardContent>
      </Card>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        >
          {pickup.lat !== 0 && <Marker position={pickup} />}
          {destination.lat !== 0 && <Marker position={destination} />}
        </GoogleMap>
      </LoadScript>

      <Box sx={{ marginTop: 2 }}>
        <TextField
          fullWidth
          label="Pickup Location"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Destination"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleBookRide}
        >
          Book Ride
        </Button>
      </Box>
    </Box>
  );
};

export default RideBooking; 