export type UserPreferences = {
  theme: 'light' | 'dark' | 'system';
};

export type UserBasic = {
  uid: string;
  email: string;
  username: string;
  fullName: string;
  preferences: UserPreferences;
};

export type BookBasic = {
  uid: string;
  title: string;
  description: string;
  author: UserBasic;
};
