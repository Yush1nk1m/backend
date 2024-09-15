import { PickType } from '@nestjs/mapped-types';
import { User } from '../../user/user.entity';

export class ProfileDto extends PickType(User, [
  'email',
  'firstName',
  'lastName',
  'picture',
  'accessToken',
] as const) {}
