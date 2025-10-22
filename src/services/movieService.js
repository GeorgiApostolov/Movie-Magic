import Movie from "../models/Movie.js";
import { Document } from "mongoose";

export default {
  getAll(filter) {
    let query = Movie.find();

    if (filter.title) {
      query = query.find({ title: { $regex: filter.title, $options: "i" } });
    }
    if (filter.genre) {
      query = query.find({
        genre: { $regex: new RegExp(`^${filter.genre}$`), $options: "i" },
      });
    }
    if (filter.year) {
      query = query.where("year").equals(filter.year);
    }

    return query;
  },
  getOne(movieId) {
    // return Movie.findOne({ _id: movieId });
    return Movie.findById(movieId).populate("casts");
  },
  create(movieData, userId) {
    return Movie.create({
      ...movieData,
      rating: Number(movieData.rating),
      creator: userId,
    });
  },
  async attach(movieId, castId) {
    const movie = await Movie.findById(movieId);
    movie.casts.push(castId);
    return movie.save();
  },
};
