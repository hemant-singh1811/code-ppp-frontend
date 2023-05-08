import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Login from "../screens/authentication/Login";
import ProtectedRoute from "../screens/authentication/ProtectedRoute";
import Dashboard from "../components/dashboard/pages/Dashboard";
import About from "../screens/about/About";
import Chats from "../components/chats/Chats";
import PageNotFound from "../screens/PageNotFound";
import TableScreen from "../screens/Table/TableScreen";
import Testing from "../Testing/Testing";

export default function MainRouting() {
  const { userInfo } = useSelector((state) => state.auth);

  const routes = [
    {
      path: "/:baseId/:tableId",
      component: <TableScreen />,
    },
    { path: "/chats", component: <Chats /> },
    { path: "/group-chat", component: <Chats /> },
    { path: "/about", component: <About /> },
    { path: "/testing", component: <Testing /> },
  ];

  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} />} />
      <Route path="/" element={userInfo ? <Dashboard /> : <Login />} />
      <Route element={<ProtectedRoute />}>
        {routes.map(({ path, component }, index) => {
          return <Route key={index} path={path} element={component} />;
        })}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
