import { hashPassword } from "../lib/crypto";
import * as userRepository from "../repository/userCollection";
export const updateUserData = async (req, res) => {
  try {
    const { userId, ...data } = req.body;
    await userRepository.updateUser(userId, data);
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await userRepository.fetchUser(userId);
    if (!userData) return res.status(404).json({ error: "User not found" });
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
