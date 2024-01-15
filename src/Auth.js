import React, { useContext, useState } from "react";
import { auth, provider } from "./config/config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from "./context/AuthContext";
import "./index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Auth = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(auth?.currentUser);
      // console.log("Dei login aaguthuda navigate tha aga matinguthu !");
      console.log(currentUser.displayName);
      // const authInfo = {
      //   userID: currentUser.uid,
      //   name: auth.currentUser.displayName,
      //   email: currentUser.email,
      //   isAuth: true,
      // };
      // localStorage.setItem("auth", JSON.stringify(authInfo));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log("Autentication Error: ", err);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span>Expense Tracker App</span>
        <span>Login</span>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className="input"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn}>login</button>
          {err && <p style={{ color: "red" }}>Someting went wrong</p>}
          <p>
            Don't Have an account ? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Auth;
