import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../../pages/HomePage';
import { FavoritesProvider } from '../../context/FavouriteContext';
import { AuthProvider } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom'; // <-- import MemoryRouter

// Mock getAllCountries API
jest.mock('../../api/countries', () => ({
  getAllCountries: jest.fn(),
  getCountryByName: jest.fn(),
}));

import { getAllCountries, getCountryByName } from '../../api/countries';

const mockCountries = [
  { name: { common: 'Canada' }, cca3: 'CAN', region: 'Americas', population: 100, flags: { svg: '' } },
  { name: { common: 'France' }, cca3: 'FRA', region: 'Europe', population: 200, flags: { svg: '' } },
];

describe('HomePage integration with SearchBar', () => {
  beforeEach(() => {
    getAllCountries.mockResolvedValue(mockCountries);
    getCountryByName.mockImplementation((query) => {
      return Promise.resolve(
        mockCountries.filter(c =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all countries initially and filters by search', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <FavoritesProvider>
            <HomePage />
          </FavoritesProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    // Wait for countries to load
    expect(await screen.findByText(/Canada/i)).toBeInTheDocument();
    expect(screen.getByText(/France/i)).toBeInTheDocument();

    // Type in the search bar
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: 'can' } });

    // Wait for filtered result
    await waitFor(() => {
      expect(screen.getByText(/Canada/i)).toBeInTheDocument();
      expect(screen.queryByText(/France/i)).not.toBeInTheDocument();
    });
  });
});