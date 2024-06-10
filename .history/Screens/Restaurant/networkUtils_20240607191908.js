// networkUtils.js

const getLocalIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ipv4Address = data.ip;
  
      // Check if the address is IPv4
      const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (ipv4Regex.test(ipv4Address)) {
        return ipv4Address;
      } else {
        throw new Error('Not a valid IPv4 address');
      }
    } catch (error) {
      console.error('Error getting IP address:', error);
      return '127.0.0.1'; // Fallback to localhost if no IP found
    }
  };
  
  export { getLocalIpAddress };
  