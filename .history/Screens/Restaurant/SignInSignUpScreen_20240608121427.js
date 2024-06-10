import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet,Switch,Alert, Platform, PermissionsAndroid,  } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import PasswordEye from 'react-native-password-eye';
import axios from 'axios';
// import CountryPicker from 'react-native-country-picker-modal';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';


import HomeScreen from './HomeScreen';


import { createStackNavigator } from '@react-navigation/stack';


import { NavigationContainer } from '@react-navigation/native';

// Function to sign up
const signUp = async (name, email, password, phoneNumber) => {
  try {
    const fullPhoneNumber = `+213${phoneNumber}`; // Include static country code
    const role = 'client'; // Static role
    const response = await axios.post('http://192.168.113.110:7777/user-service/api/v1/signup', { // Use local IP
      name,
      email,
      password,
      phoneNumber: fullPhoneNumber,
      role, // Include static role in the request
    });
    // Handle successful sign-up (e.g., navigate to the next screen)
    console.log('Sign-up successful:', response.data);
    return response.data; // Return response data if needed
  } catch (error) {
    // Handle sign-up error (e.g., display error message)
    console.error('Sign-up error:', error.response?.data || error.message);
    throw error; // Throw error for error handling in the component
  }
};

//location

// SignInScreen component
const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    requestLocationPermission().then(() => {
      getLocationAndSave();
    });
  }, []);

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://192.168.113.110:7777/user-service/api/v1/login/client', {
        email,
        password,
      });
      const userId = response.data.data._id; // Adjust according to your response
      const token = response.data.token;
      await AsyncStorage.setItem('userId', userId); // Store the user ID
      await AsyncStorage.setItem('token', token);
      showMessage({
        message: 'Success',
        description: 'Logged in successfully',
        type: 'success',
      });
      setTimeout(() => {
        navigation.navigate('WelcomeScreen');
      }, 1599); // 2000 milliseconds = 2 seconds
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Failed to log in. Please try again.',
        type: 'danger',
      });
      console.error('Error signing in:', error);
    }
  };


  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Function to handle form validation and sign in
  const handleFormSubmit = () => {
    // Validate inputs
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    // Set errors
    setErrors(errors);

    // If no errors, proceed with sign in
    if (Object.keys(errors).length === 0) {
      handleSignIn();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { marginTop: 30 }]}>
        <Icon name="envelope" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Switch
          trackColor={{ false: '#767577', true: '#fbc207' }}
          thumbColor={showPassword ? '#FB5607' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowPassword(!showPassword)}
          value={showPassword}
        />
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <TouchableOpacity onPress={handleFormSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or login with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.loginOptions}>
        {/* Add icons for login options */}
        <Icon name="google" size={40} color="#DB4437" style={[styles.icon, styles.loginIcon]} />
        <Icon name="facebook" size={40} color="#3B5998" style={[styles.icon, styles.loginIcon]} />
        <Icon name="apple" size={40} color="#000" style={[styles.icon, styles.loginIcon]} />
      </View>
      <FlashMessage position="bottom" />
    </View>
  );
};

// SignUpScreen component
const SignUpScreen = ({ setIndex }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignUp = async () => {
    try {
      await signUp(name, email, password, phoneNumber);
      showMessage({
        message: 'Success',
        description: 'Sign Up successful',
        type: 'success',
      });
      setIndex(0);
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Failed to Sign Up. Please try again.',
        type: 'danger',
      });
      console.error('Error signing up:', error);
    }
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Function to handle form validation and sign up
  const handleFormSubmit = () => {
    // Validate inputs
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    }

    // Set errors
    setErrors(errors);

    // If no errors, proceed with sign up
    if (Object.keys(errors).length === 0) {
      handleSignUp();
    }
  };
  return (
    <View style={styles.container}>
   
      <View style={[styles.inputContainer, { marginTop: 30 }]}>
        <Icon name="user" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <View style={styles.inputContainer}>
      <Icon name="phone" size={20} color="#999" style={styles.icon} />
  {/* <CountryPicker
    withFlag
    withCallingCode
    withCallingCodeButton
    withAlphaFilter
    onSelect={(country) => setCountryCode(country.cca2)}
    countryCode={countryCode}
    modalProps={{ visible: false }} // Hide the modal by default
  /> */}
  <TextInput
    style={styles.input}
    placeholder="Phone Number"
    value={phoneNumber}
    onChangeText={setPhoneNumber}
    keyboardType="phone-pad"
  />
</View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Switch
          trackColor={{ false: '#767577', true: '#fbc207' }}
          thumbColor={showPassword ? '#FB5607' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowPassword(!showPassword)}
          value={showPassword}
        />
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
        <Switch
          trackColor={{ false: '#767577', true: '#fbc207' }}
          thumbColor={showPassword ? '#FB5607' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowPassword(!showPassword)}
          value={showPassword}
        />
       
      </View>
      
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
      <TouchableOpacity style={styles.signInButton} onPress={handleFormSubmit}>
        <Text style={styles.signInButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <FlashMessage position="top" />

    </View>
  );
  
};


const ThirdScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'signIn', title: 'Sign In' },
    { key: 'signUp', title: 'Sign Up' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'signIn':
        return <SignInScreen />;
      case 'signUp':
        return <SignUpScreen setIndex={setIndex} />; // Pass setIndex as a prop      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#FB5607' }}
      style={{ backgroundColor: '#fff',fontFamily: 'Poppins' }}
      activeColor="#FB5607"
      inactiveColor="#999"
      labelStyle={{ fontFamily: 'Poppins' }}
    />
  );

  return (
    <View style={styles.container}>
      {/* Logo container */}
      <View style={styles.topContainer}>
        {/* Skip button */}
        <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')} style={styles.skipButton}>
          <Image source={require('../../assets/skip_button.png')} style={styles.skipButtonImage} />
        </TouchableOpacity>
        
        {/* Logo */}
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
      </View>

      {/* Sign in / Sign up tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FB5607',
    paddingVertical: 60,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  skipButtonImage: {
    width: 65,
    height: 15,
  },
  logo: {
    width: 100, // Adjust the size of the logo
    height: 160, // Adjust the size of the logo
    marginBottom: 20, // Add margin to the bottom of the logo
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Align horizontally in the center
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginVertical: 15,
    paddingHorizontal: 12,
    width: '80%', // Adjust the width to 80% of the parent container
    alignSelf: 'center', // Align itself in the center of the parent container
  },
  input: {
    flex: 1,
    height: 40, // Decrease the height of the input
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins', // Decrease the font size
  },
  icon: {
    marginRight: 10,
  },
  error: {
    color: 'red',
    alignSelf:'flex-start',
    left:50 
  },
  

  forgotPassword: {
    alignSelf: 'flex-end', // Align to the right
    marginVertical: 10,
    right:30,
  },
  forgotPasswordText: {
    color: '#999',
    fontSize: 14,
    fontFamily:'Poppins'
  },
  signInButton: {
    width:'80%',
    backgroundColor: '#FB5607',
    padding: 18,
    borderRadius: 5,
    marginVertical:30,
    left:35,
    shadowColor: '#FB5607',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    elevation: 8,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily:'Poppins'
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#999',
  },
  orText: {
    color: '#999',
    marginHorizontal: 10,
    fontFamily:'Poppins'
  },
 // Update the styles for loginOptions
loginOptions: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,

},

// Adjust the marginRight for the icons to create space between them
loginIcon: {
  padding:20 // Add margin to separate login icons
},
});

export default ThirdScreen;