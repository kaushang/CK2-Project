import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import RideBooking from './components/RideBooking';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <RideBooking />
      </Container>
    </ThemeProvider>
  );
}

export default App;
