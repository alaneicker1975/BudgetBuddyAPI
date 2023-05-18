export const userSchema = {
  type: 'Object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
  },
};

export const updateUserSchema = {
  type: 'Object',
  properties: {
    oldPassword: { type: 'string' },
    newPassword: { type: 'string' },
  },
};
