import Movie from "../models/Movie.js";
import { Document } from "mongoose";

export default {
  async getAll(filter) {
    const result = await Movie.find(filter);

    // const resultObj = result.map((movie) => movie.toObject());

    return result;
  },
  getOne(movieId) {
    return Movie.findOne({ _id: movieId });
  },
  create(movieData) {
    movieData.rating = Number(movieData.rating);

    return Movie.create(movieData);
  },
};
