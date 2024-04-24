import { useState, Fragment, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Album } from "./album";
import Expense from "./expense";
// import LoginForm from "../login";
import LoginForm from "../login";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useCookies } from "react-cookie";




const ProtectedRoute = ({children}) =>{
  const [cookies] =useCookies();
  return cookies.token ? children :<Navigate to='/login'/>
}





const routes= createBrowserRouter([
{
  path:"/expense",
  Component:Expense,
},
{
  path:"/",
  Component:LoginForm
},
]);

function App() {
  return (
 
    <>
  <RouterProvider router={routes}/>
    </>
  );
}

export default App;
