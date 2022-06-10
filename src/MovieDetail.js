import React, {useState, useEffect} from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

export default function MovieDetail() {

const apiKey = "4513190c99de11f7886a1c5ec0b7c629";
const id = useParams()
const [detail, setDetail] = useState({})
const [genres, setGenres] = useState([])
const [companies, setCompanies] = useState([])

useEffect(()=>{
    fetch(`
        https://api.themoviedb.org/3/movie/${id.id}?api_key=${apiKey}&language=en-US`)
        .then((resp)=>{
            return resp.json()
        }).then((data)=>{
            setDetail(data)
            setGenres(data.genres)
            setCompanies(data.production_companies)
        })
}, [])

console.log(detail)


  return (
     
    <Box sx={{ display: "flex" }} justifyContent="space-evenly" margin={2}>
    <img className="detailPoster" src={"https://image.tmdb.org/t/p/w500/" + detail.poster_path} />
    <Box sx={{ mt :5}} >
    <Box sx={{ display: "flex" }} flexDirection="column" justifyContent="space-evenly">
      <Typography sx={{ mt :1}}  variant="h4">{detail.title}</Typography>
      <Typography sx={{ mt :1}} variant="h6">Release Date:</Typography>
      <Typography sx={{ mt :1}} variant="body">{detail.release_date}</Typography>
      <Typography sx={{ mt :1}} variant="h6">Overview:</Typography>
      <Typography sx={{ mt :1}} variant="body">{detail.overview}</Typography>
      <Typography sx={{ mt :1}} variant="h6">Genres:</Typography>
      <Box sx={{ display: "flex" }} >
      {genres.map((genre)=>{
        return(
            <div className="genre" key={genre.id}>
                <Typography variant="body">{genre.name}</Typography>
            </div>
        )
      })}
      </Box>
      <Typography sx={{ mt :1}} variant="h6">Average Rating:</Typography>
      <Typography sx={{ mt :1}} variant="body">{detail.vote_average}</Typography>
      <Typography sx={{ mt :1}} variant="h6">Your Rating:</Typography>
      <Typography sx={{ mt :1}} variant="body">Not yet</Typography>
      <Typography sx={{ mt :1}} variant="h6">Production Companies:</Typography>
      <Box sx={{ display: "flex" }} >
      {companies.map((company)=>{
        return(
            <div key={company.id}>
                <img className="companyLogo" src={"https://image.tmdb.org/t/p/w500/" + company.logo_path} />
                <Typography variant="body">{company.name}</Typography>
            </div>
        )
      })}
      </Box>

      </Box>
    </Box>
    </Box>
  );
}
