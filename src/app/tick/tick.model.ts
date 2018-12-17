export interface Tick {
  place: string;
  date: Date;
  reminder ?: boolean;
  reminded ?: string;
  bodyLocation ?: string;
}
