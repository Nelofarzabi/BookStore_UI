import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8089/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); 
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:8089/api/users/${id}`);
      fetchUsers(); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = (user) => {
    navigation.navigate('AddUser', { user });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" testID="loading-indicator" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {users.length === 0 ? (
            <Text>No users found.</Text>
          ) : (
            users.map((user) => (
              <View key={user.id} style={styles.listItem}>
                <Text>
                  {user.name} {user.lastname}
                </Text>
                <View style={styles.spacing} />
                <Button title="Update" testID="update-user-button" onPress={() => updateUser(user)} />
                <View style={styles.spacing} />
                <Button title="Delete" onPress={() => deleteUser(user.id)} />
                <View style={styles.spacing} />
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  listItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  spacing: {
    height: 10,
  },
});

