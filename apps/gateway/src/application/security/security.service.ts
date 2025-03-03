import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(
        password,
        Number.parseInt(process.env.SALT_ROUNDS, 10),
      );
    } catch (err) {
      throw new Error(`Password hashing failed. ${err}`);
    }
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      throw new Error('Password verification failed.');
    }
  }
}
