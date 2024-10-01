import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import AddUserScreen from '../../screens/AddUserScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('AddUserScreen - Add User functionality', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    useRoute.mockReturnValue({ params: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the API and navigate to UserList after adding a user', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { getByRole } = render(<AddUserScreen />);
    
    const addButton = getByRole('button', { name: /add user/i });

    fireEvent.press(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://10.0.2.2:8089/api/users', {
        name: '',
        lastname: '',
        address: '',
        gender: '',
        email: '',
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith('UserList');
    });
  });
});
