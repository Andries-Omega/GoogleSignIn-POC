import { Route, Routes } from "react-router";
import "./App.css";
import Portal from "./components/portal/Portal";
import SignIn from "./components/sign-in/SignIn";
import { gapi } from "gapi-script";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [isSignedIn, setSignedIn] = useState(
    !!sessionStorage.getItem("user_access_token")
  );
  const clientId = import.meta.env.VITE_CLIENT_GOOGLE_ID;

  useEffect(() => {
    const start = async () => {
      await gapi.client.init({ clientId });
    };

    gapi.load("client:auth2", start);
  }, []);

  const handleIsSignedIn = () => {
    // Ideally if it was full app i'd store the isSignedIn with redux, but i am too tired to go that direction, this was the fastest
    setSignedIn(!!sessionStorage.getItem("user_access_token"));
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to="portal" />
            ) : (
              <SignIn handleIsSignedIn={handleIsSignedIn} />
            )
          }
        />
        <Route
          path="/portal"
          element={
            isSignedIn ? (
              <Portal handleIsSignedIn={handleIsSignedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
