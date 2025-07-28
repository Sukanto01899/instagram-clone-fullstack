import React, { useEffect } from "react";
import { useGetMyProfileQuery } from "../services/user/userService";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../store/slice/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { data, isLoading, isError, isSuccess } = useGetMyProfileQuery();
  const disPatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (isSuccess && data && !auth.userInfo) {
      disPatch(setUserInfo(data));
    }
  }, [isSuccess, auth.userInfo, disPatch, data]);

  if (isLoading || (!auth.userInfo && !isError)) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};
export default ProtectedRoute;
