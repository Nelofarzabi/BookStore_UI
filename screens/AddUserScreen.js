import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AddUserScreen() {
  const [user, setUser] = useState({ name: '', lastname: '', address: '', gender: '', email: '' });
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params.user) {
      setUser(route.params.user); 
    } else {
      setUser({ name: '', lastname: '', address: '', gender: '', email: '' }); 
    }
  }, [route.params]);

  const addUser = async () => {
    try {
      if (user.id) {
        await axios.put(`http://10.0.2.2:8089/api/users/${user.id}`, user);
      } else {
        await axios.post('http://10.0.2.2:8089/api/users', user);
      }
      setUser({ name: '', lastname: '', address: '', gender: '', email: '' });
      navigation.navigate('UserList');
    } catch (error) {
      console.error("Error updating user:", error); 
      alert("Failed to update user. Please try again."); 
    }
  };
  const showUsers = () => {
    navigation.navigate('UserList');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.id ? 'Update User' : 'Add User'}</Text>
      <TextInput
        placeholder="First Name"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={user.lastname}
        onChangeText={(text) => setUser({ ...user, lastname: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={user.address}
        onChangeText={(text) => setUser({ ...user, address: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Gender"
        value={user.gender}
        onChangeText={(text) => setUser({ ...user, gender: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        style={styles.input}
      />
      <Button title={user.id ? 'Update User' : 'Add User'}   onPress={addUser} />
      <View style={styles.spacing} />
      <Button title="Show Users"  onPress={showUsers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  
  spacing: {
    height: 10,
  },
});


