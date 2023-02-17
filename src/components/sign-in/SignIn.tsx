import { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { useNavigate } from "react-router";
import "./sign-in.css";
export default function SignIn(props: { handleIsSignedIn: Function }) {
  const { handleIsSignedIn } = props;
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_CLIENT_GOOGLE_ID;
  const [signInFailed, setFailure] = useState(false);

  const handleSuccess = (
    signInResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in signInResponse && "accessToken" in signInResponse) {
      sessionStorage.setItem(
        "user_info",
        JSON.stringify(signInResponse.profileObj)
      );

      sessionStorage.setItem(
        "user_access_token",
        JSON.stringify(signInResponse.accessToken)
      );

      handleIsSignedIn();
      navigate("portal");
      return;
    }

    setFailure(true);
  };

  return (
    <div className="sign-in">
      <h1 className="sign-in-title">Sign In</h1>
      {!signInFailed && <p className="error">Failed to sign in, Try again</p>}
      <GoogleLogin
        clientId={clientId}
        buttonText="Continue with google"
        className="sign-in-button"
        onSuccess={handleSuccess}
        onFailure={() => {
          setFailure(true);
        }}
        cookiePolicy={"single_host_origin"}
        responseType={"code,token"}
      ></GoogleLogin>
    </div>
  );
}
