export type UserPreferences = {
  theme: "light" | "dark" | "system";
};

export type User = {
  uid: string;
  email: string;
  username: string;
  fullName: string;
  preferences: UserPreferences;
};

export type Book = {
  uid: string;
  title: string;
  description: string;
  author: User;
};
