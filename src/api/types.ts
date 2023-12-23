export interface UserModel {
  id: string;
  username: string;
  ts?: string;
  level?: string;
}

export interface LoginModel {
  accessToken: string;
}

export class ExpenseQueryModel {
  id_rashoda?: number;
  datum_rashoda?: string;
  naziv_parcele?: string;
  naziv_kulture?: Date;
  naziv_masine?: string;
  naziv_operacije?: string;
  sifra_masine?: string;
  sifra_parcele?: string;
  sifra_kulture?: string;
  sifra_operacije?: string;
}
