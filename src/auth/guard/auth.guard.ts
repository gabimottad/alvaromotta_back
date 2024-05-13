// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const username = request.username;
    console.log('Username:', username);

    if (username) {
      const userExists = await this.usersService.userExistsByUsername(username);
      console.log('User exists:', userExists);
      return userExists;
    }

    console.log('Username not found in request.');
    return false;
  }
}
