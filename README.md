# GlobeIQ

A modern, professional React + Vite application for exploring countries around the world. 

[Live Demo on Netlify](https://globeiq.netlify.app/)

---

## Features
- Browse and search for countries with live filtering
- Filter by region and language
- View detailed country information
- Mark countries as favorites (per user)
- Responsive, mobile-friendly UI
- Animated transitions and modern design
- Mock authentication with demo users
- Unit and integration tests with Jest and Testing Library

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/af-2-Loo0per.git
   cd "Countries API"
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Development

To start the development server with hot reload:
```bash
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

To build the app for production:
```bash
npm run build
```
- The output will be in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## Testing

Run all unit and integration tests:
```bash
npm test
```
- Tests are located in `src/components/__tests__/` and cover critical UI and logic.

---

## Usage

- **Landing Page:** Click anywhere or the arrow button to enter the app.
- **Login:** Use demo credentials:
  - Username: `test` / Password: `test123`
  - Username: `demo` / Password: `demo123`
- **Explore:** Search, filter, and view country details.
- **Favorites:** Mark countries as favorites (per user, requires login).

---

## Deployment (Netlify)

This app is ready for deployment on Netlify. The `netlify.toml` and `_redirects` files ensure proper SPA routing.

1. **Push your code to GitHub.**
2. **Connect your repo on [Netlify](https://www.netlify.com/).**
3. **Set build command:** `npm run build`
4. **Set publish directory:** `dist`
5. **Deploy!**

---

## Project Structure

```
Countries API/
  src/
    assets/           # Images, video, etc.
    components/       # Reusable UI components
    context/          # React context providers
    pages/            # Page components (Home, Favorites, Login, etc.)
    api/              # API utility functions
    utils/            # Utility helpers
    ...
  public/
    _redirects        # Netlify SPA routing
  netlify.toml        # Netlify config
  ...
```

---

