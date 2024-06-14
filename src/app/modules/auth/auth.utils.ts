import jwt from 'jsonwebtoken';

export const generateToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret as string, { expiresIn });
};
