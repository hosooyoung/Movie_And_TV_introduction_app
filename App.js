import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Text, View, Image, useColorScheme } from 'react-native';
import * as Font from 'expo-font';
import { DarkTheme, LightTheme } from './style.js';
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Root from './navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
const queryClient = new QueryClient();
// SplashScreen.preventAutoHideAsync();
/*
const loadFonts = (fonts) => fonts.map((font)=> Font.loadAsync(font))
const loadAssets = (assets) => assets.map((asset) =>{
  if(typeof asset ==='string'){
    return Image.prefetch(asset)
  }else {
    return Asset.loadAsync(asset)
  }
})
*/
export default function App() {
  let isdark = useColorScheme() === 'dark';
  //   const [assets] = useAssets([
  //     require('./assets/logo_farmos.png'),
  //     'https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg',
  //   ]);
  //   const [loaded] = Font.useFonts([Ionicons.font]);
  //   console.log('loaded');
  /*
  const [ready, setready] = useState(true);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const fonts = loadFonts([Ionicons.font]);
        const assets = await loadAssets([require('./assets/logo_farmos.png'),'https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg'])
        await Promise.all([...fonts, ...assets])
        console.log('did')
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setready(true);
      }
    }
    prepare();
  }, []);*/

  // const onLayoutRootView = useCallback(async () => {
  //   if (assets || loaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [assets]);
  console.log(isdark);
  return (
    // <View>
    //   <Text>??</Text>
    // </View>
    // <NavigationContainer theme={!isdark ? DarkTheme : DefaultTheme}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isdark == false ? DarkTheme : LightTheme}>
        <NavigationContainer>
          <Root />
          {/* <Stacks /> */}
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
