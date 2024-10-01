import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BookScreen() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({ title: '', author: '' });
  
  const fetchBooks = async () => {
    const response = await axios.get('http://10.0.2.2:8089/api/books');
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    await axios.post('http://10.0.2.2:8089/api/books', book);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://10.0.2.2:8089/api/books/{id}`);
    fetchBooks();
  };

  const updateBook = async (id) => {
    await axios.put(`http://10.0.2.2:8089/api/books/{id}`, book);
    fetchBooks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Books</Text>
      <TextInput
        placeholder="Title"
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Author"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={styles.input}
      />
      <Button title="Add Book" onPress={addBook} />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.title} by {item.author}</Text>
            <Button title="Delete" onPress={() => deleteBook(item.id)} />
            <Button title="Update" onPress={() => updateBook(item.id)} />
          </View>
        )}
      />
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
