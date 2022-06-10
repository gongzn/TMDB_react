import React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, Link, HashRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Typography,
} from "@mui/material";


export default function Navbar() {
  return (
    <>
      {/* <HashRouter> */}
        <ThemeProvider theme={theme}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <img
                    className="logoImg"
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                  />

                  <Typography variant="h5" sx={{ m: 2 }}>
                    <Link to="/">HOME</Link>
                  </Typography>

                  <Typography variant="h5" sx={{ m: 2 }}>
                    <Link to="/favorite">FAVORITE</Link>
                  </Typography>

                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, m: 2 }}
                  >
                    <Link to="/rated">RATED</Link>
                  </Typography>

                  <Typography variant="h6"><Link to="/login"> Login </Link></Typography>
                </Toolbar>{" "}
              </Container>
            </AppBar>
          </Box>{" "}
        </ThemeProvider>



    </>
  );
}
