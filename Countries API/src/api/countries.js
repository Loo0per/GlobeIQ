const BASE_URL = "https://restcountries.com/v3.1";

// Get all countries
export async function getAllCountries() {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

// Search country by name
export async function getCountryByName(name) {
  const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Country not found");
  return res.json();
}

// Get countries by region
export async function getCountriesByRegion(region) {
  const res = await fetch(`${BASE_URL}/region/${encodeURIComponent(region)}`);
  if (!res.ok) throw new Error("Failed to fetch region");
  return res.json();
}

// Get country by code (for details)
export async function getCountryByCode(code) {
  const res = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error("Country not found");
  return res.json();
}