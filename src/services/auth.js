import bcrypt from 'bcrypt';
import { pool } from '../database';
import { createError } from '../helpers/error';

export const authenticateUser = async (body) => {
  try {
    const { rows } = await pool.query(
      `SELECT * 
       FROM user_account
       WHERE username = $1`,
      [body.username],
    );

    const { password, ...user } = rows[0];

    const isValidUser = await bcrypt.compare(body.password, password);

    if (!isValidUser) {
      throw createError(401);
    }

    return { data: user };
  } catch (error) {
    return { error };
  }
};
