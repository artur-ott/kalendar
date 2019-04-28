import { Drive as Credentials } from "security";
import { CalendarPage } from "pages";

export default class Drive {
  static _instance: Drive;
  static getInstance() {
    if (this._instance === undefined) Drive._instance = new Drive();
    return Drive._instance;
  }

  _wait = false;
  key = null;

  refreshKey() {
    fetch(Credentials.token_uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: Credentials.grant_type,
        refresh_token: Credentials.refresh_token,
        client_id: Credentials.client_id,
        client_secret: Credentials.client_secret
      })
    })
      .then(response => {
        if (response.status >= 400)
          throw Error(JSON.stringify(response.json()));
        return response.json();
      })
      .then(responseJson => {
        this.key = responseJson.access_token;
      })
      .catch(error => {
        throw Error(`Could not refresh Drive key! (${error})`);
      });
  }

  getAllCalendars(update: (calendars: Array<object>) => void) {
    if (this.key === null) {
      this.refreshKey();
      setTimeout(() => this.getAllCalendars(update), 500);
      return;
    }

    fetch(`${Credentials.files_uri}/${Credentials.file_id}?alt=media`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.key}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          this.refreshKey();
          this._wait = true;
          setTimeout(() => this.getAllCalendars(update), 500);
          return [];
        }
        return response.json();
      })
      .then(responseJson => {
        if (!this._wait) {
          update(responseJson);
        }
      })
      .catch(error => {
        throw Error(`Could not get any calendar data! (${error})`);
      });
  }
};
