import React, { useEffect } from "react";
import NavBar from "../navigation/leftNavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RootPage = () => {
  const navigate = useNavigate();
  const checkAuth = async () => {
    await fetch(" https://entertainmentapp-backend.onrender.com/api/user/verify-user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // Checking the user auth status
  useEffect(() => {
    checkAuth();
  });

  return (
    <div className="p-6 max-sm:p-0 flex max-lg:flex-col gap-4 lg:gap-6 h-screen w-full">
      <NavBar />
      <div className="max-lg:w-full lg:w-11/12">
        <Outlet />
      </div>
    </div>
  );
};

export default RootPage;