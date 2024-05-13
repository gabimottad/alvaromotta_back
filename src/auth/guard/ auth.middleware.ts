// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({
        message: 'Forbidden resource',
        error: 'Forbidden',
        statusCode: 403,
      });
    }

    try {
      const decoded = this.jwtService.verify(token);
      req = decoded;

      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Forbidden resource',
        error: 'Forbidden',
        statusCode: 403,
      });
    }
  }
}
