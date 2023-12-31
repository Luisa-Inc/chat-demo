import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  query,
  addDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";


const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, color, userID } = route.params; // Get the name and selected background color for the chat
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) {
        unsubMessages();
      }
      unsubMessages = null;

      // Listen for new messages in Firestore
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (querySnapshot) => {
        let newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        setMessages(newMessages);
        cacheMessages(newMessages); // Cache the new messages
      });
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [db, isConnected]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    console.log("onSend function called with:", newMessages);
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Custom rendering of the input toolbar based on network connectivity
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Custom styling for chat message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      {/* GiftedChat component for rendering the chat interface */}

      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderCustomView={renderCustomView}
        user={{
          _id: userID, // Extract the user ID from route.params
          name: name, // Extract the name from route.params
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
