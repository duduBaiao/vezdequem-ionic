import {User} from './user';

export class Record {
  id: number;
  user: User;
  paid: number;
  taken: number;
  paid_count: number;
  taken_count: number;

  last_payment: string;
  last_taking: string;
  last_paid: number;
  last_taken: number;

  took: boolean;

  record_url: string;
}
