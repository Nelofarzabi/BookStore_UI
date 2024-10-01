import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import UserListScreen from '../../screens/UserListScreen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('UserListScreen - Update User', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('should navigate to AddUserScreen when update button is pressed', async () => {
    const mockUsers = [{ id: 1, name: 'John', lastname: 'Doe' }];
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    const { getByText } = render(<UserListScreen />);

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });

    // Press the update button
    fireEvent.press(getByText('Update'));

    // Check if navigation was called
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddUser', { user: mockUsers[0] });
  });
});
