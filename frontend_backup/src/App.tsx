import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Outlet, Route } from "react-router-dom";
import Header from './header/Header'
import HomePage from './home/HomePage'
import CoffeesPage from './coffees/CoffeesPage'
import BrewingPage from './brewing/BrewingPage'
import TastingsPage from './tastings/TastingsPage'
import AboutPage from './about/AboutPage'
import CommunityPage from './community/CommunityPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="coffees" element={<CoffeesPage />} />
          <Route path="brewing" element={<BrewingPage />} />
          <Route path="tastings" element={<TastingsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App;
