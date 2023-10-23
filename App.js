// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// create navigator
const stack = createNativeStackNavigator();

//import other functions
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

//import Firestore
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";


// Firebase configuration object
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBFpzV36z1cz3h0NjyAj3AchHtSxheM6CM",
    authDomain: "chatapp-b23ab.firebaseapp.com",
    projectId: "chatapp-b23ab",
    storageBucket: "chatapp-b23ab.appspot.com",
    messagingSenderId: "232082015281",
    appId: "1:232082015281:web:075de60af6adfb48f74110",
    measurementId: "G-H8Y852PNWW",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


    return (
      <NavigationContainer>
        <stack.Navigator initialRouteName="Start">
          <stack.Screen name="Start" component={Start} />
          <stack.Screen name="Chat" component={Chat} />
        </stack.Navigator>
      </NavigationContainer>
    );
  }

  export default App