import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from '../auth/dto/profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // check if an user already exists and create if it's not existing
  async findOrCreate(profile: ProfileDto): Promise<User> {
    // extract the user information
    const { email, firstName, lastName, picture, accessToken } = profile;

    // find the user from DB
    let user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    // if the user does not exist
    if (!user) {
      // create and save the user information on DB
      user = this.userRepository.create({
        email,
        firstName,
        lastName,
        picture,
        accessToken,
      });
      await this.userRepository.save(user);
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
