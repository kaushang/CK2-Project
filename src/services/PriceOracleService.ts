import axios from 'axios';

export class PriceOracleService {
  private weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY || '';
  private trafficApiKey = process.env.REACT_APP_TRAFFIC_API_KEY || '';

  async getWeatherImpact(latitude: number, longitude: number): Promise<number> {
    try {
      // This would be replaced with actual weather API call
      // const response = await axios.get(`https://api.weather.com/data?lat=${latitude}&lon=${longitude}&key=${this.weatherApiKey}`);
      // return this.calculateWeatherMultiplier(response.data);
      return 1.2; // Mock value for bad weather
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return 1.0; // Default multiplier
    }
  }

  async getTrafficMultiplier(pickup: string, destination: string): Promise<number> {
    try {
      // This would be replaced with actual traffic API call
      // const response = await axios.get(`https://api.traffic.com/data?origin=${pickup}&destination=${destination}&key=${this.trafficApiKey}`);
      // return this.calculateTrafficMultiplier(response.data);
      return 1.3; // Mock value for heavy traffic
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      return 1.0; // Default multiplier
    }
  }

  async getFuelPrice(): Promise<number> {
    try {
      // This would be replaced with actual fuel price API call
      // const response = await axios.get('https://api.fuel.com/prices');
      // return response.data.price;
      return 3.5; // Mock value in USD per gallon
    } catch (error) {
      console.error('Error fetching fuel price:', error);
      return 3.0; // Default value
    }
  }

  calculatePriceMultiplier(
    driverCount: number,
    riderCount: number,
    weatherImpact: number,
    trafficMultiplier: number,
    fuelPrice: number
  ): number {
    const baseMultiplier = 1.0;
    const driverRiderRatio = driverCount / (riderCount || 1);
    const demandMultiplier = driverRiderRatio < 1 ? 1.5 : 1.0;
    
    // Calculate fuel impact
    const fuelImpact = (fuelPrice / 3.0); // Normalize against base price of $3.0
    
    // Combine all factors
    return baseMultiplier * demandMultiplier * weatherImpact * trafficMultiplier * fuelImpact;
  }

  async calculateFinalPrice(
    basePrice: number,
    pickup: { lat: number, lng: number },
    destination: { lat: number, lng: number }
  ): Promise<number> {
    const weatherImpact = await this.getWeatherImpact(pickup.lat, pickup.lng);
    const trafficMultiplier = await this.getTrafficMultiplier(
      `${pickup.lat},${pickup.lng}`,
      `${destination.lat},${destination.lng}`
    );
    const fuelPrice = await this.getFuelPrice();
    
    // Mock values for driver and rider counts
    const driverCount = 5;
    const riderCount = 8;
    
    const multiplier = this.calculatePriceMultiplier(
      driverCount,
      riderCount,
      weatherImpact,
      trafficMultiplier,
      fuelPrice
    );
    
    return basePrice * multiplier;
  }
}

export default new PriceOracleService(); 