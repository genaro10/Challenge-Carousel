import React from 'react';
import { AppState, AsyncStorage, SafeAreaView } from 'react-native';
import ListCarrousel from './src/Screens/ListCarrousel.tsx/ListCarrousel';

export default function App() {

  return (
    <SafeAreaView>
      <ListCarrousel/>
    </SafeAreaView>
  )
}

