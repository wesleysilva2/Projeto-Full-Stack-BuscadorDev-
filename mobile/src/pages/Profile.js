import React, { useState ,useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation, route}) {
  
  const  github_username  = route.params.github_username;

  return (
    <WebView style={{ flex: 1}} source={{ uri: `https://github.com/${github_username}` }}>
      <Text>Profile Screen</Text>
    </WebView>
  );
}

export default Profile;