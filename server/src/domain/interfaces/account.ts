export interface SignUpModel {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface SignInModel {
  email: string;
  password: string;
}

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface JwtPayload {
  user: UserModel;
}
