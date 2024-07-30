import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import Genre from '../pages/watchlist/Genre';
import Search from '../pages/Search';
import History from '../pages/History';
import Favourites from '../pages/Favourites';
import Watchlist from '../pages/watchlist/Watchlist';
import MyAccount from '../pages/MyAccount';
import TrendingWatchlistMovies from '../pages/watchlist/TrendingWatchlistMovies';
import TrendingWatchlist from '../pages/watchlist/TrendingWatchlist';
export default function AppRoutes() {
  return (
    <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/history" element={<History />} />
      <Route path="/favourite" element={<Favourites />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/watchlist/trending-watchlist" element={<TrendingWatchlist />} />
      <Route path="/watchlist/trending-watchlist/:id" element={<TrendingWatchlistMovies />} />
      <Route path="/watchlist/:slug" element={<Genre />} />
      <Route path="/my-account" element={<MyAccount />} />
    </Route>
  </Routes>
  )
}
