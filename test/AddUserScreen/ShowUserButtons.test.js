import { render, fireEvent } from '@testing-library/react-native';
import AddUserScreen from '../../screens/AddUserScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('AddUserScreen - Show Users functionality', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    useRoute.mockReturnValue({ params: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to UserList when pressing Show Users button', () => {
    const { getByText } = render(<AddUserScreen />);
    const showUsersButton = getByText('Show Users');

    fireEvent.press(showUsersButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('UserList');
  });
});
