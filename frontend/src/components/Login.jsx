import { useState } from "react";

import { client } from "../utils/sanity";

import { GoogleLogin } from "react-google-login";

import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";

import { ServerDown } from "../components";

import { videoLogin } from "../assets";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const cookie = new Cookies();

  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const googleSuccess = (res) => {
    const { name, imageUrl, googleId } = res.profileObj;
    cookie.set("user_id", googleId, {
      path: "/",
    });
    const user = {
      _type: "user",
      _id: googleId,
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });
  };

  const googleFailure = () => {
    setError(true);
  };

  if (error) {
    return <ServerDown />;
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="relative w-full h-full bg-black">
        <video
          src={videoLogin}
          controls={false}
          muted
          loop
          autoPlay
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="absolute">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_AUTH_ID}
          render={(renderProps) => (
            <button
              type="button"
              className="flex justify-center items-center bg-white p-3 rounded-lg outline-none"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FcGoogle className="mr-4" />
              Sign in with Google
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default Login;
