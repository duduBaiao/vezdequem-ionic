import {Storage} from '@ionic/storage';
import {User} from '../models/user';
import {Authentication} from '../models/authentication';
import {Session} from '../models/session';

export function configFactory(storage: Storage) {
  return new Config(storage);
}

export class Config {

  //static apiUrl = "http://localhost:3000";
  static apiUrl = "https://vezdequem.herokuapp.com";
  static appVersion = "1.4.5";

  public static language = 'pt';
  public static country = 'BR';
  public static locale = 'pt-BR';
  public static currency = 'BLR';

  private _session: Session = null;

  constructor(private storage: Storage) {
  }

  sessionKey() {
    return "session-" + Config.apiUrl;
  }

  loadSession() {
    return this.storage.get(this.sessionKey()).then(
      (session) => {
        this._session = session ? session : new Session();

        return this._session;
      });
  }

  private saveSession() {
    this.storage.set(this.sessionKey(), this._session);
  }

  setUser(user: User) {
    this._session.authentication = new Authentication(user.email, user.authentication_token);
    this._session.user_id = user.id;
    this._session.nick_name = user.nick_name;

    this.saveSession();
  }

  setGroupId(groupId: number) {
    this._session.group_id = groupId;

    this.saveSession();
  }

  setNickName(nick_name: string) {
    this._session.nick_name = nick_name;

    this.saveSession();
  }

  session() {
    return this._session;
  }

  clearSession() {
    this._session = new Session();
    
    this.storage.remove(this.sessionKey());
  }
}