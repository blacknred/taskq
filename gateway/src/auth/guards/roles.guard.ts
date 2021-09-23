import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../consts';
import { AuthedGuard } from './authed.guard';

@Injectable()
export class RolesGuard extends AuthedGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!roles) return true;

      const req = context.switchToHttp().getRequest();

      return (
        super.canActivate(context) &&
        req.session.roles.some((role) => roles.includes(role))
        // req.session.passport.user.roles
      );
    } catch (_) {
      throw new ForbiddenException('Access restricted');
    }
  }
}
