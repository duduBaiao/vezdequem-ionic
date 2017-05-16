import {Group} from './group';
import {Record} from './record';

export class Consumption {
  group: Group;
  records: Array<Record>;
  payerRecord: Record;
  paid: number;
}
