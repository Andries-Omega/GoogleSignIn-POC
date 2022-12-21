import { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router";
import styles from "src/App.css";
import { SignedInUser } from "@interfaces/user";

export default function Portal(props: { handleIsSignedIn: Function }) {
  const { handleIsSignedIn } = props;

  const navigate = useNavigate();
  const [fuckoffFailure, setFailure] = useState(false);
  const [userInfo, setUserInfo] = useState<SignedInUser | null>(null);

  const clientId = import.meta.env.VITE_CLIENT_GOOGLE_ID;

  useEffect(() => {
    const userInfo = sessionStorage.getItem("user_info");
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      setUserInfo(userInfoObj);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user_info");
    sessionStorage.removeItem("user_access_token");
    handleIsSignedIn();
    navigate("/");
  };

  return (
    <div>
      <h1 className=" text-slate-100 mb-8 font-bold">
        Hi
        <span className=" text-blue-500 animate-pulse mx-1">
          {userInfo?.name}
        </span>
        You are in the portal
      </h1>
      {fuckoffFailure && (
        <p className="error">Ah man you failed to eveb fuck off</p>
      )}
      <GoogleLogout
        className="w-full"
        clientId={clientId}
        buttonText="Sign out"
        onLogoutSuccess={handleLogout}
        onFailure={() => {
          setFailure(true);
        }}
      ></GoogleLogout>
    </div>
  );
}
