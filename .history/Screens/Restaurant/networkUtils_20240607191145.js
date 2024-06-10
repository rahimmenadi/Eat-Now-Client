// networkUtils.js
import DeviceInfo from 'react-native-device-info';

const getLocalIpAddress = async () => {
  try {
    const ipAddress = await DeviceInfo.getIpAddress();
    return ipAddress;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return '127.0.0.1'; // Fallback to localhost if no IP found
  }
};

export { getLocalIpAddress };
