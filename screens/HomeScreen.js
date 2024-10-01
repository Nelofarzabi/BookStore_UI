import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Bookstore</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddUser')}>
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
      <View style={styles.spacing} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddBook')}>
        <Text style={styles.buttonText}>Manage Books</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 15, 
    borderRadius: 5,
    width: '80%', 
    alignItems: 'center',
    marginVertical: 10, 
    elevation: 2, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 19, 
  },
  spacing: {
    height: 10,
  },
});
