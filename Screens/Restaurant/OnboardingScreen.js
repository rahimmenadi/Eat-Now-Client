import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const imageX = React.useRef(new Animated.Value(0)).current;
  const textOpacity = React.useRef(new Animated.Value(1)).current;
  const textTranslateY = React.useRef(new Animated.Value(0)).current;
  
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        textOpacity.setValue(1);
        textTranslateY.setValue(0);
      });
      Animated.timing(imageX, {
        toValue: -500,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        imageX.setValue(0);
      });
    } else {
      navigation.navigate('SignInSignUpScreen');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 10,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        textOpacity.setValue(1);
        textTranslateY.setValue(0);
      });
      Animated.timing(imageX, {
        toValue: 500,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        imageX.setValue(0);
      });
    }
  };

  const handleSkip = () => {
    navigation.navigate('WelcomeScreen');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <View style={styles.topContainer}>
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Image source={require('../../assets/skip_button.png')} style={styles.skipButtonImage} />
              </TouchableOpacity>
              <Image source={require('../../assets/pizza.png')} style={styles.mainImage} />
            </View>
            <Animated.View style={[styles.textContainer, { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }]}>
              <Text style={styles.heading}>Choose your meal</Text>
              <Text style={styles.placeholderText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec...</Text>
              <Image source={require('../../assets/progress_image_1.png')} style={styles.progressBar} />
            </Animated.View>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.topContainer}>
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Image source={require('../../assets/skip_button.png')} style={styles.skipButtonImage} />
              </TouchableOpacity>
              <Animated.Image
                source={require('../../assets/v2.png')}
                style={[styles.mainImage, { transform: [{ translateX: imageX }] }]}
              />
            </View>
            <Animated.View style={[styles.textContainer, { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }]}>
              <Text style={styles.heading}>Prepare your order</Text>
              <Text style={styles.placeholderText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec...</Text>
              <Image source={require('../../assets/progress_image_2.png')} style={styles.progressBar} />
            </Animated.View>
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.topContainer}>
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Image source={require('../../assets/skip_button.png')} style={styles.skipButtonImage} />
              </TouchableOpacity>
              <Image source={require('../../assets/v3.png')} style={styles.mainImage} />
            </View>
            <Animated.View style={[styles.textContainer, { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }]}>
              <Text style={styles.heading}>Receive your order</Text>
              <Text style={styles.placeholderText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec...</Text>
              <Image source={require('../../assets/progress_image_3.png')} style={styles.progressBar} />
            </Animated.View>
          </>
        );
      default:
        return null;
    }

  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>{currentStep === 3 ? 'Finish' : 'Next'}</Text>
      </TouchableOpacity>
      {currentStep > 1 && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FB5607',
    alignItems: 'center',
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 400,
    overflow: 'hidden',
    padding:30
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 30,
  },
  skipButtonImage: {
    width: 65,
    height: 15,
  },
  mainImage: {
    width: 300,
    height: 250,
    marginTop: 45,
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  heading: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderText: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins',
    fontSize: 13,
  },
  progressBar: {
    width: '80%',
    height: 20,
    resizeMode: 'contain',
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: '#FB5607',
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 10,
    marginTop: 600,
    elevation: 8,
    shadowColor: '#FB5607',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  backButton: {
    backgroundColor: '#fff',
    borderColor: '#FB5607',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 10,
    marginTop: 20,
    elevation: 8,
    shadowColor: '#FB5607',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  backButtonText: {
    color: '#FB5607',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
});

export default OnboardingScreen;
