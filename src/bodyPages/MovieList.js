import React from "react"
import {Grid, Box} from "@mui/material"
import MovieCard from "../MovieCard"


export default function MovieList(props){

    return(
        <Box m={2}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }} >
        {props.list.map((movie) => {
      return (
          <Grid item sm={3} key={movie.id}>
        <MovieCard
          movie={movie}
        />
        </Grid>
      );
    })}
        </Grid>
        </Box>
    )
}