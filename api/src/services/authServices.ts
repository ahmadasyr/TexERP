const jwt = require("jsonwebtoken");

const authMiddleware = (
  req: { headers: { authorization: string }; user: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  },
  next: () => void
) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const generateToken = (user: { id: any; email: any }) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
