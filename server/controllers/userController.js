import UserModel from '../models/UserModel.js'; // Ensure the path is correct
import bcrypt from 'bcryptjs'; // Import the entire bcryptjs module
import jwt from 'jsonwebtoken'; // Import the entire jsonwebtoken module

// Register a new user
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new UserModel({ name, email, password });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10); // Use bcrypt to generate salt
    user.password = await bcrypt.hash(password, salt); // Use bcrypt to hash password

    await user.save();

    // Create token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => { // Use jwt to sign token
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

// Authenticate user and return token
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare password
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => { // Use jwt to sign token
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

// Get logged-in user's data
export async function getUserData(req, res) {
  try {
    const user = await UserModel.findById(req.user.id).select("-password"); // Exclude password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
