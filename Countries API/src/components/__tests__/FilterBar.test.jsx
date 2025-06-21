import { render, screen } from '@testing-library/react';
import FilterBar from '../FilterBar';
import React from 'react';

test('renders region and language dropdowns', () => {
  render(
    <FilterBar
      onRegionChange={() => {}}
      onLanguageChange={() => {}}
      selectedLanguage={null}
      selectedRegion=""
    />
  );
  expect(screen.getByText(/Select Region/i)).toBeInTheDocument();
  expect(screen.getByText(/Select Language/i)).toBeInTheDocument();
});