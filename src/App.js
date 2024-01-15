import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import ExpenseTracker from "./pages/ExpenseTracker";
import Register from "./pages/Register";
import "./index.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/auth" />;
    } else {
      return children;
    }
  };
  // console.log(currentUser.uid);
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <ExpenseTracker />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
