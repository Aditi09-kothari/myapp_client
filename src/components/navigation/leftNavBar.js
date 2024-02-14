import React, { useState } from "react";
import { MdMovie } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { HiSquares2X2 } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import UserLogout from "../Logout/userLogout";

const NavBar = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-[#161D2F] w-24 h-full max-lg:w-full max-lg:h-20 max-sm:h-16 rounded-2xl max-sm:rounded-none text-3xl max-sm:text-2xl flex lg:flex-col items-center max-lg:justify-between lg:py-6 max-lg:px-6 max-sm:px-4">
      <div className="lg:flex lg:items-start lg:h-1/6">
        <MdMovie onClick={() => { navigate("/root/home");}}
          className="text-red-500 text-5xl max-sm:text-4xl cursor-pointer hover:text-red-600"/>
      </div>
      <div className="text-gray-400 flex lg:flex-col gap-8 max-sm:gap-4 lg:h-2/6">
        <HiSquares2X2 onClick={() => {navigate("/root/home");}}/>
        <MdLocalMovies onClick={() => {navigate("/root/movie");}}/>
        <PiTelevision onClick={() => {navigate("/root/tv-series");}}/>
        <FaRegBookmark onClick={() => {navigate("/root/bookmarks");}}/>
      </div>
      <div className="max-lg:hidden lg:h-2/6"></div>
      <div className="relative lg:h-1/6 lg:flex lg:items-end z-30">
        <FaUserCircle
          onClick={() => setShowUserDetails((prev) => !prev)}
          className="text-white hover:text-gray-200 cursor-pointer"
        />
        {showUserDetails && (
          <UserLogout setShowUserDetails={setShowUserDetails} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;