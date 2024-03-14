import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AdminPage,
  AuthPage,
  DashboardPage,
  HomePage,
  PageNotFound,
} from "pages";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user";
import Loader from "../modules/Loader";

const Router = () => {
  const { data, isLoading,error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
console.log({ data, isLoading,error });
  if (isLoading) return <Loader/>
  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={data?<DashboardPage />:<Navigate to="/auth"/>} />
    <Route path="/auth" element={data?<Navigate to="/dashboard"/>: <AuthPage />} />
    <Route path="/admin" element={data && data?.data?.role ==="ADMIN"?<AdminPage />:<Navigate to="/"/>} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
  );
};

export default Router;
