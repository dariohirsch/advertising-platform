import axios from 'axios';
import { useEffect } from 'react';
// import {useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
// import useAuth from "../hooks/useAuth";

export default function HomePage() {
  // const { currentUser, logoutUser } = useAuth();
  // const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // const handleLogOut = () => {
  //   logoutUser();
  //   navigate("/");
  // };

  useEffect(() => {
    toTheBack();
  });

  const toTheBack = () => {
    axios.get(`${API_URL}/api/clients`).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <Navbar />
      {/* <h1>HOme</h1>
      {currentUser ? (
        <>
          <h3>el usuario logueado es: {currentUser.email}</h3>
          <button onClick={handleLogOut}>LOGOUT</button>
        </>
      ) : (
        <>
          <h3>No hay usuario logueado</h3>
          <Link to="/login">LOGIN</Link>
        </>
      )} */}
    </div>
  );
}
