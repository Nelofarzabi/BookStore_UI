import { render } from '@testing-library/react-native';
import AddUserScreen from '../../screens/AddUserScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('AddUserScreen - Form Pre-population', () => {
  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {
        user: { id: 1, name: 'John', lastname: 'Doe', address: '123 Main St', gender: 'Male', email: 'john.doe@example.com' },
      },
    });
  });

  it('should pre-fill the form with existing user data', () => {
    const { getByDisplayValue } = render(<AddUserScreen />);

    expect(getByDisplayValue('John')).toBeTruthy();
    expect(getByDisplayValue('Doe')).toBeTruthy();
    expect(getByDisplayValue('123 Main St')).toBeTruthy();
    expect(getByDisplayValue('Male')).toBeTruthy();
    expect(getByDisplayValue('john.doe@example.com')).toBeTruthy();
  });
});
