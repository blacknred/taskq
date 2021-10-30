import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // calling a method that passport adds to the request object when sessions are in use
    return context.switchToHttp().getRequest().isAuthenticated();
  }
}