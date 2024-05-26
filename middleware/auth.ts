import jwt from 'jsonwebtoken';

export const auth = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('Access Denied: No Token Provided!');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied: Malformed Token!');
  }

  try {
    jwt.verify(token, 'super secret key here', (err: any, user: any) => {
      if (err) {
        return res.status(403).send('Invalid Token');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
