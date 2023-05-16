import { pool } from '../db';
import { hashPassword } from '../helpers/password';

export const createUser = async (body) => {
  try {
    const { email, username, password } = body;
    const hashedPassword = await hashPassword(password);

    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    const { rows } = await pool.query(
      `INSERT INTO user_account (user_account_id, username, password, email)
       VALUES (uuid_generate_v4(), $1, $2, $3)
       RETURNING user_account_id`,
      [username, hashedPassword, email],
    );

    return { data: { created_id: rows[0].user_account_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const updateUser = async (userId, body) => {
  // Updates a user
};

export const deleteUser = async (userAccountId) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM user_account
       WHERE user_account_id = '${userAccountId}'
       RETURNING user_account_id`,
    );

    return { data: { deleted_id: rows[0].user_account_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};
