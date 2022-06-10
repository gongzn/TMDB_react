import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./theme"
import { useNavigate } from "react-router-dom";




export default function MediaCard(props) {

    const nevigate = useNavigate()


  return (
    <Card sx={{ maxWidth: 345}}>
    <ThemeProvider theme={theme}>
      <CardMedia
        component="img"
        height="500"
        image={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path}
        alt="green iguana"
      />
      
      <Button onClick={()=>{nevigate(`/movie/${props.movie.id}`)}}color="primary">
      <CardContent width="100%">
        
        <Typography gutterBottom variant="h5" component="div">
          {props.movie.title}
        </Typography>
        
      </CardContent>
      </Button>
      
      
      <Box display="flex" justifyContent="space-between" sx={{ m: 2 }}>
      <Button size="medium"><StarIcon/>{props.movie.vote_average}</Button>
        <Button size="medium"><FavoriteBorderIcon/></Button>
      </Box>
      </ThemeProvider>


    </Card>
  );
};