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
  naziv_kulture?: string;
  naziv_masine?: string;
  naziv_operacije?: string;
  sifra_masine?: string;
  sifra_parcele?: string;
  sifra_kulture?: string;
  sifra_operacije?: string;
}
export class CultureQueryModel {
  sifra_kulture?: number;
  naziv_kulture?: string;
  ts?: Date;
  sifra_korisnika?: number;
}
export class OperationQueryModel {
  sifra_operacije?: number;
  naziv_operacije?: string;
  ts?: Date;
  sifra_korisnika?: number;
}

export class MachineQueryModel {
  sifra_masine?: number;
  naziv_masine?: string;
  ts?: Date;
  vrsta_masine?: number;
  tip_masine?: number;
  sifra_korisnika?: number;
}

export class PortionQueryModel {
  sifra_parcele?: number;
  naziv_parcele?: string;
  povrsina?: number;
  ts?: Date;
  sifra_korisnika?: number;
}

export class UsagesWorkerQueryModel {
  cas?: number;
  ucinak?: number;
  zastoj?: number;
  cas_ucinak?: number;
  cas_cena?: number;
  pov_ucinak?: number;
  cas_zastoj?: number;
  ime_i_prezime_radnika?: string;
  naziv_tipa_rada?: string;
  sifra_radnika?: number;
  sifra_tip_rada?: number;
  id_rashodi_radnici?: number;
}

export class WorkTypeQueryModel {
  sifra_tip_rada?: string;
  naziv_tipa_rada?: string;
  ts?: Date;
  sifra_korisnika?: number;
  koeficijent?: number;
}
export class WorkerQueryModel {
  sifra_radnika?: string;
  ime_i_prezime_radnika?: string;
  ts?: Date;
  sifra_korisnika?: number;
}

export class ExpenseUsageQueryModel {
  kolicina_utroska?: number;
  sifra_utroska?: string;
  naziv_utroska?: string;
  id_rashodi_utrosci?: number;
}

export class ExpenditureQueryModel {
  sifra_utroska?: string;
  jm_utroska?: string;
  naziv_utroska?: string;
  ts?: Date;
  sifra_korisnika?: number;
}
