import prisma from '../../prisma/prisma.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Please provide Authorization header'
      });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Auth header should be of type Bearer'
      });
    }

    const session = await prisma.session.findUnique({
      where: { accessToken: token },
    });

    if (!session) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Session not found'
      });
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Access token expired'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'User not found'
      });
    }

    req.user = user;
    req.accessToken = token;

    next();
  } catch (err) {
    next(err);
  }
};
