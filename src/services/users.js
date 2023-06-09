import bcrypt from 'bcrypt';
import { pool } from '../database';
import { createError } from '../helpers/error';
import { hashPassword } from '../helpers/password';

// bcrypt.hash('qawsed44', 12, function (err, hash) {
//   console.log(hash);
// });

export const createUser = async (body) => {
  try {
    const { email, username, password } = body;
    const hashedPassword = await hashPassword(password);

    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    const {
      rows: [user],
    } = await pool.query(
      `INSERT INTO user_account (user_account_id, username, password, email)
       VALUES (uuid_generate_v4(), $1, $2, $3)
       RETURNING user_account_id`,
      [username, hashedPassword, email],
    );

    return { data: { createdId: user.user_account_id } };
  } catch (error) {
    return { error };
  }
};

export const updateUser = async (userAccountId, body) => {
  try {
    const { oldPassword, newPassword } = body;

    const {
      rows: [user],
    } = await pool.query(
      `SELECT password
       FROM user_account
       WHERE user_account_id = $1`,
      [userAccountId],
    );

    const isValidUser = await bcrypt.compare(oldPassword, user.password);

    if (!isValidUser) {
      throw createError(401);
    }

    const hashedPassword = await hashPassword(newPassword);

    const {
      rows: [updatedUser],
    } = await pool.query(
      `UPDATE user_account
       SET password = $1
       WHERE user_account_id = $2 
       RETURNING user_account_id
      `,
      [hashedPassword, userAccountId],
    );

    return { data: { updatedId: updatedUser.user_account_id } };
  } catch (error) {
    return { error };
  }
};

export const deleteUser = async (userAccountId) => {
  try {
    const {
      rows: [user],
    } = await pool.query(
      `DELETE FROM user_account
       WHERE user_account_id = $1
       RETURNING user_account_id`,
      [userAccountId],
    );

    return { data: { deletedId: user.user_account_id } };
  } catch (error) {
    return { error };
  }
};
