import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './index';
import AddCategory from './addCategory';
import AddCarrito from './addCarrito';
import CategoryDetailsScreen from '@/app/CategoryScreen'; 
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


export function RootLayout() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="Menu" component={HomeScreen} />
        <Stack.Screen name="Agrega Categoria" component={AddCategory} />
        <Stack.Screen name="Categoria" component={CategoryDetailsScreen} />
        <Stack.Screen name="Agrega Carrito" component={AddCarrito} />
      </Stack.Navigator>
  );
}

export default RootLayout;