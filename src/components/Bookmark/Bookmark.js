import React, { useEffect, useState } from "react";
import { MdLocalMovies } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookmarkPage = () => {
  const [bookmarkedContents, setBookmarkedContents] = useState({});
  const navigate = useNavigate();

  const GetBookmarkedMovies = async () => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    await fetch(
      `https://entertainmentapp-backend.onrender.com/api/user/get-all-bookmarks/${email}`
    )
      .then((res) => res.json())
      .then((movie) => {
        setBookmarkedContents(movie.data);
      });
  };

  // Getting all the bookmarked contents after the rendering of the page
  useEffect(() => {
    GetBookmarkedMovies();
  }, []);

  // Deleting Bookmarks
  const DeleteBooking = async (id, type) => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    await fetch(
      `https://entertainmentapp-backend.onrender.com/api/user/delete-bookmark/${type}/${email}/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          toast.success(data.msg);
          GetBookmarkedMovies();
        } else {
          toast.error(data.msg);
        }
      });
  };

  return (
    <div className="max-md:mx-2 max-sm:pb-2 pb-6">
      <div className="text-white mt-4 max-md:mt-2 pr-6 max-lg:pb-6 max-sm:pr-2 h-5/6">
        <div>
          <p className="text-2xl max-sm:text">Bookmarked Movies</p>
          {bookmarkedContents.bookmarkedMovies?.length === 0 && (
            <p className="max-sm:text-xs text-gray-500 max-sm:mt-0.5 mt-1">
              There is no bookmarked Movies.
            </p>
          )}
          <div className="mt-4 lg:mt-8 grid lg:grid-cols-4 2xl:grid-cols-5 lg:gap-6 xl:gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
            {bookmarkedContents.bookmarkedMovies?.map((movie, index) => {
              if (movie.backdrop_path) {
                return (
                  <div key={index} className="relative text-white">
                    <div
                      onClick={() => DeleteBooking(movie._id, "movie")}
                      className="group absolute cursor-pointer z-10 top-2 right-2 max-sm:top-1 max-sm:right-1 max-sm:text-lg sm:text-xl p-1 rounded-full bg-black bg-opacity-50"
                    >
                      <MdDelete />
                      <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                        Delete
                      </span>
                    </div>
                    <img
                      onClick={() => {
                        navigate("/movie-details", {
                          state: { ...movie, bookmarked: true },
                        });
                      }}
                      className="cursor-pointer lg:rounded-lg max-lg:rounded-md max-sm:rounded hover:opacity-70"
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                      alt=""
                    />
                    <div className="flex items-center max-md:gap-1 max-lg:gap-1.5 lg:gap-2 max-sm:gap-0.5 max-sm:text-xs text-gray-300 max-lg:text-sm lg:text-base max-sm:mt-0.5 mt-1">
                      <p>{movie.release_date.slice(0, 4)}</p>
                      <div className="flex items-center">
                        <MdLocalMovies />
                        <p>Movie</p>
                      </div>
                      <p className="font-medium">{movie.original_language}</p>
                    </div>
                    <p className="max-sm:text-xs max-md:text-sm max-lg:text-lg font-medium">
                      {movie.title}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div>
          <p className="text-2xl max-sm:text mt-4 max-sm:mt-2">
            Bookmarked TV Series
          </p>
          {bookmarkedContents.bookmarkedTvSeries?.length === 0 && (
            <p className="max-sm:text-xs text-gray-500 max-sm:mt-0.5 mt-1">
              There is no bookmarked TV Series.
            </p>
          )}
          <div className="mt-4 lg:mt-8 grid lg:grid-cols-4 2xl:grid-cols-5 lg:gap-6 xl:gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-2 max-lg:gap-6">
            {bookmarkedContents.bookmarkedTvSeries?.map((serial, index) => {
              if (serial.backdrop_path) {
                return (
                  <div key={index} className="relative text-white">
                    <div
                      onClick={() => DeleteBooking(serial._id, "tv_series")}
                      className="group absolute cursor-pointer z-10 top-2 right-2 max-sm:top-1 max-sm:right-1 max-sm:text-lg sm:text-xl p-1 rounded-full bg-black bg-opacity-50"
                    >
                      <MdDelete />
                      <span className="max-sm:text-xs ml-2 mt-1 max-sm:ml-0 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-[#10141E] text-white">
                        Delete
                      </span>
                    </div>
                    <img
                      onClick={() => {
                        navigate("/movie-details", {
                          state: { ...serial, bookmarked: true },
                        });
                      }}
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
                      <p className="font-medium">
                        {serial.original_language}
                      </p>
                    </div>
                    <p className="max-sm:text-xs max-md:text-sm max-lg:text-lg font-medium">
                      {serial.original_name}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
