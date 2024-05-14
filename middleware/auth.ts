import jwt from 'jsonwebtoken';

export const auth = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  // console.log("Token from middleware", authHeader);
  try {
    jwt.verify(authHeader, 'super secret key here', (err: any, user: any) => {
      if (err) return res.status(403).send('Invalid Token');
      req.user = user;
      next(); 
    });
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
} 