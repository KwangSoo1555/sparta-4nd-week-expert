import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const setAccessTokenCookie = (req, res, next) => {
  const token = res.locals.token;

  if (token) {
    res.cookie('authorization', token, { httpOnly: true });
    res.locals.token = token;

    return res.status(200).json({
      message: 'Login successful.',
      accessToken: token,
    });
  } else {
    return res.status(500).json({ message: 'Token generation failed.' });
  }
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

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Authorization token has expired.' });
    } else {
      return res.status(401).json({ error: 'Invalid authorization token.' });
    }
  }
};

export { generateAccessToken, setAccessTokenCookie, verifyAccessToken };
