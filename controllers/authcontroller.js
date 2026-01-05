import authService from "../services/authService";

export const signup = async (req, res) => {
  
  try {
    const result = await authService.signup(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setRole = async (req, res) => {
  try {
    const user = await authService.setRole(req.user.id, req.body.role);
    res.json({ message: "Role set successfully", user });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
