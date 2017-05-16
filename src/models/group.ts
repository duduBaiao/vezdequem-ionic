import {Purpose} from './purpose';

export class Group {
  id: number;
  name: string;
  purpose: Purpose;
  choose_takers: boolean;

  records_url: string;
  group_url: string;
}
