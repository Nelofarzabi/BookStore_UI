import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import UserListScreen from '../../screens/UserListScreen';
import axios from 'axios';

jest.mock('axios');

describe('UserListScreen - Delete User', () => {
  it('should delete a user and refresh the user list', async () => {
    const mockUsers = [{ id: 1, name: 'John', lastname: 'Doe' }];
    axios.get.mockResolvedValueOnce({ data: mockUsers });
    axios.delete.mockResolvedValueOnce({});

    // Wrap UserListScreen in NavigationContainer
    const { getByText } = render(
      <NavigationContainer>
        <UserListScreen />
      </NavigationContainer>
    );

    // Wait for the user to be rendered
    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });

    // Delete the user
    fireEvent.press(getByText('Delete'));

    // Check if axios.delete is called
    expect(axios.delete).toHaveBeenCalledWith('http://10.0.2.2:8089/api/users/1');

    // Refresh the users
    axios.get.mockResolvedValueOnce({ data: [] });
    await waitFor(() => {
      expect(getByText('No users found.')).toBeTruthy();
    });
  });
});
