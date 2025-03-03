export type UserBasic = {
  uid: string;
  email: string;
  username: string;
  fullName: string;
};

export type ResponseError = {
  message?: string;
};

export type SignInResponse = {
  user: UserBasic;
} & ResponseError;
