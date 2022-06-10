import React, { useState, createContext } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import App from "../App"


const apiKey = "4513190c99de11f7886a1c5ec0b7c629";

export const UserContext = createContext()

export default function Login() {

  const nevigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState("");
  // const [validation, setValidation] = useState(false)
  const [user, setUser] = useState({})

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((tokenData) => {
        // console.log("token", tokenData)
        const authObj = {
          username,
          password,
          request_token: tokenData.request_token,
        };
        fetch(
          `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authObj),
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((validationData) => {
            // setValidation(true)
            // console.log("validation", validationData)
            fetch(
              `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ request_token: tokenData.request_token }),
              }
            )
              .then((resp) => {
                return resp.json();
              })
              .then((sessionData) => {
                setSession(sessionData.session_id);
                localStorage.setItem("sessionId", sessionData.session_id)
                console.log("session", sessionData.session_id)
                fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionData.session_id}`)
      .then((resp)=>{
        return resp.json()
      }).then((userData)=>{
        console.log("user", userData)
        setUser(userData)
        localStorage.setItem("username", userData.username)
        
      })

      
              });
            
          });
      })
      
      return(
        <UserContext.Provider value={user}>
          <App/>
        </UserContext.Provider>
      )

      // if (validation){
      //   nevigate("/")
      // }
  };

  return (
    <Box sx={{ display: "flex" }} justifyContent="center" margin={2}>
      <Box sx={{ display: "flex" }} flexDirection="column" alignItems="center">
        <Typography variant="h4">Login</Typography>

        <TextField
          className="loginFormItems"
          label="Username"
          variant="standard"
          value={username}
          onChange={(e) => {
            handleUsernameChange(e);
          }}
        />
        <TextField
          className="loginFormItems"
          label="Password"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => {
            handlePasswordChange(e);
          }}
        />
        <Box margin={2}>
          <Button
            className="loginFormItems"
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
