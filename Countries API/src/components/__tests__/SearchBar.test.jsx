import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

test('renders search input with placeholder', () => {
  render(<SearchBar onSearch={() => {}} />);
  expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
});

test('calls onSearch when typing in input', () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);
  const input = screen.getByPlaceholderText(/search for a country/i);
  fireEvent.change(input, { target: { value: 'Canada' } });
  expect(onSearchMock).toHaveBeenCalledWith('Canada');
});