import { PickType } from '@nestjs/mapped-types';
import { User } from '../../user/user.entity';

export class TokenResponseDto extends PickType(User, ['accessToken']) {}
