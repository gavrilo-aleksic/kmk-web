export interface UserModel {
  id: string;
  username: string;
  ts?: string;
  level?: string;
}

export interface LoginModel {
  accessToken: string;
}
