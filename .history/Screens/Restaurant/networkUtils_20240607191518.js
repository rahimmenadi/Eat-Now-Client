// networkUtils.js

const getLocalIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error getting IP address:', error);
      return '127.0.0.1'; // Fallback to localhost if no IP found
    }
  };
  
  export { getLocalIpAddress };
  