import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import CoverPage from "./components/Coverpage/CoverPage";
import LoginPage from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Movies from "./components/Movie/Movies";
import TvSeries from "./components/TvSeries/TvSeriese";
import BookmarkPage from "./components/Bookmark/Bookmark";
import RootPage from "./components/LayoutPage/Layout";
import MovieDetailsPage from "./components/Details/MovieDetails";
import Store  from "./redux/Store/store"
import { Provider } from "react-redux"

function App() {
  return (
    <div className="bg-[#10141E] h-screen overflow-y-scroll scrollbar-hide overflow-x-hidden">
      <Provider store={Store}>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="movie-details" element={<MovieDetailsPage />} />
        <Route path="root" element={<RootPage />}>
          <Route path="home" element={<HomePage />} />
          <Route path="movie" element={<Movies />} />
          <Route path="tv-series" element={<TvSeries />} />
          <Route path="bookmarks" element={<BookmarkPage />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </Provider>
    </div>
  );
}

export default App;