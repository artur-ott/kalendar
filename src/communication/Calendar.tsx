import { Credentials } from "security";

export default class Calendar {
  static _instance: Calendar;
  static getInstance() {
    if (this._instance === undefined) Calendar._instance = new Calendar();
    return Calendar._instance;
  }

  getRefreshKey(_code: string, addCalendar: (key:string) => void) {
    fetch(Credentials.token_uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: decodeURIComponent(_code),
        client_id: Credentials.client_id,
        client_secret: Credentials.client_secret,
        grant_type: Credentials.grant_type,
        redirect_uri: Credentials.redirect_uris[0]
      })
    })
      .then(response => {
        if (response.status >= 400)
          throw Error(`Code: ${response.status}; ${JSON.stringify(response.json())}`);
        return response.json();
      })
      .then(responseJson => {
        addCalendar(responseJson.refresh_token);
      })
      .catch(error => {
        throw Error(`Could not get refresh key! (${error})`);
      });
  }
}
