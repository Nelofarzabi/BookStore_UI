import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function BookListScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8089/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const showBooks = () => {
    navigation.navigate('BookList'); 
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:8089/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const updateBook = (book) => {
    navigation.navigate('AddBook', { book });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {books.length === 0 ? (
            <Text>No books found.</Text>
          ) : (
            books.map((book) => (
              <View key={book.id} style={styles.listItem}>
                <Text>
                  {book.name} by {book.author}
                </Text>
                <View style={styles.spacing} />
                <Button title="Update" onPress={() => updateBook(book)} />
                <View style={styles.spacing} />
                <Button title="Delete" onPress={() => deleteBook(book.id)} />
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
