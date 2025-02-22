import { ethers } from 'ethers';

export class BlockchainService {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;

  constructor() {
    // Initialize provider and signer when MetaMask is available
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
    } else {
      throw new Error('Please install MetaMask to use this application');
    }
  }

  async connectWallet(): Promise<string> {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = await this.signer.getAddress();
      return address;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  // Function to interact with the ride booking smart contract
  async bookRide(pickup: string, destination: string, price: string): Promise<string> {
    try {
      // This would be replaced with actual smart contract interaction
      // const contract = new ethers.Contract(contractAddress, contractABI, this.signer);
      // const tx = await contract.bookRide(pickup, destination, { value: ethers.utils.parseEther(price) });
      // await tx.wait();
      // return tx.hash;
      return 'mock_transaction_hash';
    } catch (error) {
      console.error('Error booking ride:', error);
      throw error;
    }
  }

  // Function to get current driver availability
  async getDriverAvailability(): Promise<number> {
    try {
      // This would be replaced with actual smart contract interaction
      // const contract = new ethers.Contract(contractAddress, contractABI, this.provider);
      // return await contract.getAvailableDrivers();
      return 5; // Mock value
    } catch (error) {
      console.error('Error getting driver availability:', error);
      throw error;
    }
  }

  // Function to get current rider demand
  async getRiderDemand(): Promise<number> {
    try {
      // This would be replaced with actual smart contract interaction
      // const contract = new ethers.Contract(contractAddress, contractABI, this.provider);
      // return await contract.getActiveRiders();
      return 8; // Mock value
    } catch (error) {
      console.error('Error getting rider demand:', error);
      throw error;
    }
  }

  // Function to submit rating and review
  async submitRating(rideId: string, rating: number, review: string): Promise<string> {
    try {
      // This would be replaced with actual smart contract interaction
      // const contract = new ethers.Contract(contractAddress, contractABI, this.signer);
      // const tx = await contract.submitRating(rideId, rating, review);
      // await tx.wait();
      // return tx.hash;
      return 'mock_rating_transaction_hash';
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  }
}

export default new BlockchainService(); 