/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Content, Container, Footer, Button, Text as NBText, Root, Toast} from 'native-base'
import firebase from 'react-native-firebase';

const BannerAd = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const interstitialAds = firebase.admob().interstitial('ca-app-pub-3169840547408794/2483346587');
const requestB = new AdRequest();
const requestI = new AdRequest();
const bannerTestUnitId = 'ca-app-pub-3940256099942544/6300978111';
const bannerLiveUnitId = 'ca-app-pub-3169840547408794/7270313999';

type Props = {};
export default class App extends Component<Props> {
  componentDidMount(){
    this.loadBigAd();
    interstitialAds.on('onAdClosed', () =>{
      this.loadBigAd();
    })
  }
  loadBigAd(){
    interstitialAds.loadAd(requestI.build());

    interstitialAds.on('onAdLoaded', () => {
      console.log('Advert ready to show.');
    });
  }
  showBigAd(){
    if(interstitialAds.isLoaded()){
      interstitialAds.show()
    }else{
      Toast.show({
        text: 'Loading ads \nPlease wait...',
        buttonText: 'okay', 
        duration: 5000,
        onClose: (reason) => {
          this.showBigAd();
        }
      })
    }
  }
  render() {
    return (
      <Root>
        <Container>
          <Content contentContainerStyle={styles.container}>
            <View style={styles.container}>
              <Text style={styles.welcome}>Welcome to Tobiac</Text>
              <Text style={styles.instructions}>To get started, tap the button below</Text>
              <Button style={styles.insterShowButton} block
                onPress={() => this.showBigAd()}
              >
                <NBText>
                  Push Me
            </NBText>
              </Button>
            </View>
          </Content>
          <Footer style={styles.footer}>
            <BannerAd
              unitId={bannerLiveUnitId}
              size={'SMART_BANNER'}
              request={requestB.build()}
              onAdLoaded={() => {
                console.log('Advert loaded');
              }}
            />
          </Footer>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  footer:{
    backgroundColor: 'transparent'
  }, 
  insterShowButton:{
    marginVertical: 50
  }
});
