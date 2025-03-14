export type UserBasic = {
  uid: string;
  email: string;
  username: string;
  fullName: string;
  preferences: {
    theme: 'light' | 'dark';
  };
};

export type UserPreferences = {
  theme: 'light' | 'dark';
};
