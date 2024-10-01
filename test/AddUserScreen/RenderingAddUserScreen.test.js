import { render, within } from '@testing-library/react-native';
import AddUserScreen from '../../screens/AddUserScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('AddUserScreen rendering', () => {
  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {},
    });
  });

  it('should render all input fields and buttons', () => {
    const { getByPlaceholderText, getByRole } = render(<AddUserScreen />);

    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Address')).toBeTruthy();
    expect(getByPlaceholderText('Gender')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();

    const addButton = getByRole('button', { name: /add user/i });
    expect(addButton).toBeTruthy();

    const showUsersButton = getByRole('button', { name: /show users/i });
    expect(showUsersButton).toBeTruthy();
  });
});
