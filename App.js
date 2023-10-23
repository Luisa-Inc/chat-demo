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
import { getFirestore } from "firebase/firestore";

//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";


// Firebase configuration object
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDW7DaEqhhoCUjl-Dn2g6uyNnRxkgXQsj8",
    authDomain: "chat-app-b633c.firebaseapp.com",
    projectId: "chat-app-b633c",
    storageBucket: "chat-app-b633c.appspot.com",
    messagingSenderId: "788435523936",
    appId: "1:788435523936:web:25cdcc88e92603e5c36605",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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