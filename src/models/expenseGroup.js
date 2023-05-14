import { pool } from '../db';
import { setUpdatePlaceholders, getValues } from '../helpers/query';

// const { rows: expenses } = await pool.query(
//   `SELECT
//     expense.*,
//     expense_group_expense.balance,
//     expense_group_expense.due_date,
//     expense_group_expense.is_paid,
//     expense_group_expense.note
//   FROM expense
//     INNER JOIN expense_group_expense
//             ON expense.expense_id = expense_group_expense.expense_id
//   WHERE expense_group_expense.expense_group_id = ${expenseGroupId}`,
// );

export const getExpenseGroupsByUserAccountId = async (userAccountId) => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense_group
       WHERE user_account_id = '${userAccountId}'`,
    );

    return {
      data: data[0],
    };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};
