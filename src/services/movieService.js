import Movie from "../models/Movie.js";

function getAll() {
  return Movie.find();
}
