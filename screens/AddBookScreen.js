import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AddBookScreen() {
  const [book, setBook] = useState({ name: '', author: '', details: '' });
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params.book) {
      setBook(route.params.book); 
    } else {
      setBook({ name: '', author: '', details: '' }); 
    }
  }, [route.params]);

  const addBook = async () => {
    try {
      if (book.id) {
        await axios.put(`http://10.0.2.2:8089/api/books/${book.id}`, book);
      } else {
        await axios.post('http://10.0.2.2:8089/api/books', book);
      }
      setBook({ name: '', author: '', details: '' });
      navigation.navigate('BookList');
    } catch (error) {
      console.error("Error adding/updating book:", error);
      alert("Failed to add/update book. Please try again.");
    }
  };
  const showBooks = () => {
    navigation.navigate('BookList');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.id ? 'Update Book' : 'Add Book'}</Text>
      <TextInput
        placeholder="Book Name"
        value={book.name}
        onChangeText={(text) => setBook({ ...book, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Author"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Details"
        value={book.details}
        onChangeText={(text) => setBook({ ...book, details: text })}
        style={styles.input}
      />
      <Button title={book.id ? 'Update Book' : 'Add Book'} onPress={addBook} />
      <View style={styles.spacing} />
      <Button title="Show Books"  onPress={showBooks} />
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
