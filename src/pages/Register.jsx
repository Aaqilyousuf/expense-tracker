import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/config/firebase";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser).catch((err) => {
        console.log(err);
      });
      await updateProfile(auth.currentUser, { displayName: displayName }).catch(
        (err) => console.log(err)
      );
      console.log(auth.currentUser);

      const authInfo = {
        userID: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/");
    } catch (err) {
      console.log("Error : ", err);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span>Expense Tracker App</span>
        <span>Register</span>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="input"
            placeholder="Enter Your Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
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
          <button
            onClick={handleSubmit}
            className="bg-sky-500 hover:bg-sky-700"
          >
            Register
          </button>
          {err && <p>Someting went wrong</p>}
          <p>
            Have an account ? <Link to="/auth">login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
