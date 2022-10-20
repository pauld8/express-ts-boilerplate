import { Knex } from 'knex';
import crypto from 'crypto';

function hashPassword(password: string): any {
  const salt: string = crypto.randomBytes(16).toString('hex');

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return { salt, hash };
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashedPassword = hashPassword('123123');

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'paul',
      role: 'user',
      hash: hashedPassword.hash,
      salt: hashedPassword.salt,
    },
    {
      username: 'nimrod',
      role: 'admin',
      hash: hashedPassword.hash,
      salt: hashedPassword.salt,
    },
  ]);
}
