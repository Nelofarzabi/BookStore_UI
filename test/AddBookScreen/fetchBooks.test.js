import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import BookScreen from '../../screens/BookScreen';
import axios from 'axios';

jest.mock('axios');

describe('fetchBooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays books on mount', async () => {
    const books = [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' },
    ];

    axios.get.mockResolvedValueOnce({ data: books });

    const { getByText } = render(<BookScreen />);

    await waitFor(() => {
      expect(getByText('Manage Books')).toBeTruthy();
      expect(getByText('Book One by Author One')).toBeTruthy();
      expect(getByText('Book Two by Author Two')).toBeTruthy();
    });
  });
});
