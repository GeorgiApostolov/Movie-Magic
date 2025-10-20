import User from "../models/User.js";

export default {
  register(userData) {
    return User.create(userData);
  },
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid user!");
    }
  },
};
