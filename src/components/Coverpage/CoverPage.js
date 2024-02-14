import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CoverPage = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    await fetch("https://entertainmentapp-backend.onrender.com/api/user/verify-user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          navigate("/root/home");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-800">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Entertainment App</h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
