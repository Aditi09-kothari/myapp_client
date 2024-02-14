import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { PiTelevision } from "react-icons/pi";
import { toast } from "react-hot-toast";
import SearchBar from "../search-result/SearchBar";

const apiKey = "869980db09cd82cc14d5949d368a3059";

const TvSeries = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [tvseries, setTvseries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTvSeries = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setTvseries(data.results);
        } else {
          throw new Error("Failed to fetch TV series");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchTvSeries();
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchedValue(value);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${value}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchedMovieList(data.results);
      } else {
        throw new Error("Failed to search TV series");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setOpenSearchBar(true);
  };

  const BookmarkSerials = async (serial) => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    try {
      const response = await fetch("https://entertainmentapp-backend.onrender.com/api/user/bookmark-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          type: "tv_series",
          movie: serial,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg);
      } else {
        throw new Error("Failed to bookmark TV series");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while bookmarking TV series.");
    }
  };

  return (
    <div className="max-md:mx-2 pb-6 max-md:pb-2">
      <div>
        <div className="lg:mt-1 flex items-center">
          <button type="submit">
            <IoSearchOutline className="h-5 w-5 lg:h-6 lg:w-6 font-semibold text-gray-200" />
          </button>
          <input
            placeholder="Search for TV series"
            name="search-box"
            onChange={handleChange}
            type="text"
            className="block w-full text-gray-200 bg-[#10141E] py-1.5 ml-3 lg:w-1/2 outline-none focus:border-b-2 focus:border-gray-600 duration-100 lg:text-xl"
          />
        </div>
        {openSearchBar ? (
          <SearchBar
            searchedMovieList={searchedMovieList}
            searchedValue={searchedValue}
            BookmarkMovie={BookmarkSerials}
            isBookmarkedPage={false}
            type="tv_series"
          />
        ) : (
          <div className="text-white mt-4 max-sm:mt-2">
            <div className="mt-4 max-sm:mt-2">
              <p className="text-2xl max-sm:text-lg max-lg:text-xl font-medium">
                TV Series
              </p>
              <div className="mt-4 max-sm:mt-2 grid lg:grid-cols-5 lg:gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
                {tvseries.map((serial, index) =>
                  serial.backdrop_path ? (
                    <TvSeriesCard
                      key={index}
                      serial={serial}
                      BookmarkSerials={BookmarkSerials}
                      navigate={navigate}
                    />
                  ) : null
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TvSeriesCard = ({ serial, BookmarkSerials, navigate }) => (
  <div className="relative text-white">
    <div
      onClick={() => BookmarkSerials(serial)}
      className="group absolute z-10 top-2 right-2 lg:top-3 lg:right-3 max-sm:text-xl sm:text-2xl p-1 rounded-full bg-black bg-opacity-50"
    >
      <CiBookmark />
      <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
        Bookmark
      </span>
    </div>
    <img
      onClick={() => navigate("/movie-details", { state: { ...serial, bookmarked: false } })}
      className="cursor-pointer lg:rounded-lg max-lg:rounded-md max-sm:rounded hover:opacity-70"
      src={`https://image.tmdb.org/t/p/original/${serial.backdrop_path}`}
      alt=""
    />
    <div className="flex items-center max-md:gap-1 max-lg:gap-1.5 lg:gap-2 max-sm:gap-0.5 max-sm:text-xs text-gray-300 max-lg:text-sm lg:text-base max-sm:mt-0.5 mt-1">
      <p>{serial.origin_country[0]}</p>
      <div className="flex items-center">
        <PiTelevision />
        <p>TV</p>
      </div>
      <p className="font-medium">{serial.original_language}</p>
    </div>
    <p className="max-sm:text-xs max-md:text-sm max-lg:text-lg font-medium">
      {serial.original_name}
    </p>
  </div>
);
export default TvSeries;
