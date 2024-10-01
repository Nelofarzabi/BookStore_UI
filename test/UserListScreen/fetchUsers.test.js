import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import UserListScreen from '../../screens/UserListScreen';
import axios from 'axios';

jest.mock('axios');

describe('UserListScreen - Fetch Users', () => {
  it('should fetch and display users', async () => {
    const mockUsers = [
      { id: 1, name: 'John', lastname: 'Doe' },
      { id: 2, name: 'Jane', lastname: 'Doe' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockUsers });

    // Wrap UserListScreen in NavigationContainer
    const { findByText } = render(
      <NavigationContainer>
        <UserListScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(findByText('John Doe')).toBeTruthy();
      expect(findByText('Jane Doe')).toBeTruthy();
    });

    expect(axios.get).toHaveBeenCalledWith('http://10.0.2.2:8089/api/users');
  });

  it('should display a message when no users are found', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    // Wrap UserListScreen in NavigationContainer
    const { findByText } = render(
      <NavigationContainer>
        <UserListScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(findByText('No users found.')).toBeTruthy();
    });
  });
});
