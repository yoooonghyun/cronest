import * as crypto from 'crypto';

export class PasswordEncrytor {
  public async createSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
        if (err) reject(err);
        resolve(buf.toString('base64'));
      });
    });
  }

  public async encrypt(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve(key.toString('base64'));
      });
    });
  }
}
