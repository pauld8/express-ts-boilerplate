import { Request, Response } from 'express';
import { UnauthorizedError } from 'routing-controllers';
import User, { IUserRole } from '../../models/User';

export default function HasRole(role: IUserRole) {
  return (request: Request, response: Response, next: (err?: any) => any) => {
    if (!request.user) {
      throw new UnauthorizedError('Unauthorized');
    }

    const userRole: IUserRole = request.user.role;

    if (userRole != role) {
      throw new UnauthorizedError('Unauthorized');
    }

    return next();
  };
}
