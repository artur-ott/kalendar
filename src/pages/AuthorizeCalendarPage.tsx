import React, {Component} from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Credentials from 'security/Credentials'
import styles from "styles";

interface Props {}
export default class AuthorizeCalendarPage extends Component<Props> {
  render() {
    return (
      <View style={styles.app}>
        <WebView
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            const { url } = nativeEvent;
            if (url.startsWith('http://localhost:8080/')) {
              const code = url.substr(28).split('&scope')[0];
              console.error(code);
            }
          }}
          cacheEnabled={false}
          userAgent={'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'}
          source={{uri: `${Credentials.auth_uri}?client_id=${Credentials.client_id}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly&redirect_uri=${Credentials.redirect_uris[0]}&access_type=offline`}} />
      </View>
    );
  }
}