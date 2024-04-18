import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class SecurityService {
  async hashPassword(password: string): Promise<string> {
    try {
      return await hash(password, process.env.SALT);
    } catch (err) {
      throw new Error('Password hashing failed.');
    }
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await compare(password, hashedPassword);
    } catch (err) {
      throw new Error('Password verification failed.');
    }
  }
}
