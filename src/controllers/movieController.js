import { Router } from "express";
import { create } from "express-handlebars";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create", { pageTitle: "Movie Create" });
});

movieController.post("/create", (req, res) => {
  const movieData = req.body;
  const movie = movieService.create(movieData);
  res.redirect(`/`);
});

movieController.get("/:movieId/details", (req, res) => {
  const movieId = req.params.movieId;
  const movie = movieService.getOne(movieId);
  const ratingViewData = "&#x2605".repeat(Math.trunc(movie.rating));
  res.render("details", {
    movie,
    pageTitle: "Movie Details",
    rating: ratingViewData,
  });
});

movieController.get("/search", (req, res) => {
  const filter = req.query;

  const movies = movieService.getAll(filter);

  res.render("search", { movies, filter, pageTitle: "Search Movies" });
});

export default movieController;
