export interface IRequestLogin {
  login: string;
  user?: string;
  password: string;
}

export interface IResponseLogin {
  id: number;
  firstName: string;
  secondName: string;
  fatherLastname: string;
  motherLastname: string;
  lastAccess: string;
  signature: string;
  inAdministration?: any;
  login?: string;
}
