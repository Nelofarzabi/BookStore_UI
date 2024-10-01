import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import AddUserScreen from '../../screens/AddUserScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('AddUserScreen - Update User functionality', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    useRoute.mockReturnValue({
      params: {
        user: { id: 1, name: 'John', lastname: 'Doe', address: '123 Main St', gender: 'Male', email: 'john.doe@example.com' },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the API and navigate to UserList after updating a user', async () => {
    axios.put.mockResolvedValueOnce({ data: {} });

    const { getByPlaceholderText, getByRole } = render(<AddUserScreen />);

   
    fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Address'), '123 Main St');
    fireEvent.changeText(getByPlaceholderText('Gender'), 'Male');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john.doe@example.com');

    
    const updateButton = getByRole('button', { name: /update user/i });
    fireEvent.press(updateButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://10.0.2.2:8089/api/users/1', {
        id: 1,
        name: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        gender: 'Male',
        email: 'john.doe@example.com',
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith('UserList');
    });
  });
});
