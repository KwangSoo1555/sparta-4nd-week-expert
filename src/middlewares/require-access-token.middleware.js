import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

const verifyAccessToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization information is missing.' });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unsupported authorization method.' });
  }

  const accessToken = tokenParts[1];

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    const user = await prisma.users.findUnique({ where: { userId: req.userId } });
    if (!user) {
      return res.status(401).json({ error: 'Does not exist ' });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Authorization token has expired.' });
    } else {
      return res.status(401).json({ error: 'Invalid authorization token.' });
    }
  }
};

export { generateAccessToken, verifyAccessToken };
