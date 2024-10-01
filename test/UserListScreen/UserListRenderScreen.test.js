import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import UserListScreen from '../../screens/UserListScreen';
import axios from 'axios';

jest.mock('axios');

describe('UserListScreen', () => {
  beforeEach(() => {
    // Mock the API response
    axios.get.mockResolvedValue({
      data: [{ id: 1, name: 'John', lastname: 'Doe' }],
    });
  });

  it('renders loading indicator initially', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <UserListScreen />
      </NavigationContainer>
    );

    // Check if the loading indicator is present
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders user list after loading', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <UserListScreen />
      </NavigationContainer>
    );

    // Wait for the loading indicator to disappear and the user list to appear
    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });
  });

  it('renders no users found message when there are no users', async () => {
    // Mock the API response to return an empty array
    axios.get.mockResolvedValueOnce({ data: [] });

    const { getByText } = render(
      <NavigationContainer>
        <UserListScreen />
      </NavigationContainer>
    );

    // Wait for the loading indicator to disappear and the message to appear
    await waitFor(() => {
      expect(getByText('No users found.')).toBeTruthy();
    });
  });
});
