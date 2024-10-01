import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen'; 
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(), 
  };
});

describe('HomeScreen', () => {
  it('renders correctly and navigates on button press', () => {
    const navigate = jest.fn();
    useNavigation.mockReturnValue({ navigate }); 

    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByText('Welcome to the Bookstore')).toBeTruthy();

    const manageUsersButton = getByText('Manage Users');
    expect(manageUsersButton).toBeTruthy();

    fireEvent.press(manageUsersButton);
    expect(navigate).toHaveBeenCalledWith('AddUser');

    const manageBooksButton = getByText('Manage Books');
    expect(manageBooksButton).toBeTruthy();
    fireEvent.press(manageBooksButton);

    expect(navigate).toHaveBeenCalledWith('AddBook');
  });
});
