import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {UserContext} from "./Login"

import { Button, Typography } from "@mui/material";
import { theme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import MovieList from "./MovieList";

const apiKey = "4513190c99de11f7886a1c5ec0b7c629";
const username = localStorage.getItem("username")
const sessionId = localStorage.getItem("sessionId")

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("popular");
  const [pageNum, setPageNum] = useState(1);
  const [pageData, setPageData] = useState({})

  const userContext = useContext(UserContext)


  useEffect(() => {
    console.log("1", userContext)
    console.log("2", username, sessionId)
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=${pageNum}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setData(data.results);
        setIsLoading(false);
        setPageData(data)
      });
  }, [category, pageNum]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // console.log(e.target.value)
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNum < pageData.total_pages) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <>
      <Box justifyContent="center" component="div" sx={{ display: "inline" }}>
        <Box sx={{ display: "flex" }} justifyContent="center">
          <ThemeProvider theme={theme}>
            <Button onClick={handlePrevPage} variant="outlined" sx={{ m: 2 }}>
              PREV
            </Button>
            <Typography variant="h6" sx={{ m: 2 }}>
              {pageData.page} / {pageData.total_pages}
            </Typography>
            <Button onClick={handleNextPage} variant="outlined" sx={{ m: 2 }}>
              NEXT
            </Button>
          </ThemeProvider>
        </Box>
      </Box>

      <FormControl>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          label="Category"
          onChange={(e) => {
            handleCategoryChange(e);
          }}
        >
          <MenuItem value="popular" selected>
            Popular
          </MenuItem>
          <MenuItem value="now_playing">Now playing</MenuItem>
          <MenuItem value="top_rated">Top rated</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </Select>
      </FormControl>

          {/* <Box m={2}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
          {data.map((movie) => {
        return (
            <Grid item sm={3} key={movie.id}>
          <MovieCard
            movie={movie}
          />
          </Grid>
        );
      })}
          </Grid>
          </Box> */}
      

      <MovieList
      key = {data.id}
        list = {data}
    />
    </>
  );
}
