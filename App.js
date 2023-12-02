// Import necessary modules and components
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";


// Create the navigator
const Stack = createNativeStackNavigator();

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // Get network connection status
  const connectionStatus = useNetInfo();

  // Firebase configuration object
  const firebaseConfig = {
    apiKey: "AIzaSyD0I7yqzb-2ZUAV2FSZxA8P1Ai6XL2cx_g",
    authDomain: "chat-app-dbe17.firebaseapp.com",
    projectId: "chat-app-dbe17",
    storageBucket: "chat-app-dbe17.appspot.com",
    messagingSenderId: "860663769893",
    appId: "1:860663769893:web:cdfa6c54641b06a9e748cc",
  };

  // Initialize Firebase with the configuration
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    // Handle network connection changes
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db); // Disable Firebase Firestore network
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db); // Enable Firebase Firestore network
    }
  }, [connectionStatus.isConnected]);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              {...props}
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
 