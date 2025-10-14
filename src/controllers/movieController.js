import { Router } from "express";
import { create } from "express-handlebars";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create", { pageTitle: "Movie Create" });
});

movieController.post("/create", async (req, res) => {
  const movieData = req.body;
  await movieService.create(movieData);
  res.redirect(`/`);
});

movieController.get("/:movieId/details", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId);
  // const movieCasts = await castService.getAll({ includes: movie.casts });
  const ratingViewData = "&#x2605".repeat(Math.trunc(movie.rating));
  res.render("details", {
    movie,
    pageTitle: "Movie Details",
    rating: ratingViewData,
    casts: movie.casts,
  });
});

movieController.get("/search", async (req, res) => {
  const filter = req.query;

  const movies = await movieService.getAll(filter);

  res.render("search", { movies, filter, pageTitle: "Search Movies" });
});

movieController.get("/:movieId/attach", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId);
  const casts = await castService.getAll();
  res.render("casts/attach", { movie, casts });
});

movieController.post("/:movieId/attach", async (req, res) => {
  const movieId = req.params.movieId;
  const castId = req.body.cast;

  await movieService.attach(movieId, castId);

  res.redirect(`/movies/${movieId}/details`);
});

export default movieController;
