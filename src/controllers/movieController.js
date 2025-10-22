import { Router } from "express";
import { create } from "express-handlebars";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get("/create", isAuth, (req, res) => {
  if (req.isAuthenticated) {
    console.log(req.user.email);
  }
  res.render("movies/create", { pageTitle: "Movie Create" });
});

movieController.post("/create", isAuth, async (req, res) => {
  const movieData = req.body;
  const userId = req.user.id;
  await movieService.create(movieData, userId);
  res.redirect(`/`);
});

movieController.get("/:movieId/details", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId);
  // const movieCasts = await castService.getAll({ includes: movie.casts });
  const ratingViewData = "&#x2605".repeat(Math.trunc(movie.rating));

  // const isCreator = req.user?.id && movie.creator == req.user.id;
  const isCreator = movie.creator && movie.creator.equals(req.user?.id);
  res.render("movies/details", {
    movie,
    pageTitle: "Movie Details",
    rating: ratingViewData,
    casts: movie.casts,
    isCreator,
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

movieController.get("/:movideId/delete", isAuth, async (req, res) => {
  const movieId = req.params.movideId;

  const movie = await movieService.getOne(movieId);
  if (!movie.creator?.equals(req.user.id)) {
    return res.redirect("/");
  }
  await movieService.delete(movieId);

  res.redirect("/");
});

movieController.get("/:movieId/edit", async (req, res) => {
  const movieId = req.params.movieId;

  res.render("movies/edit");
});

export default movieController;
