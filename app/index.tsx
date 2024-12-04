import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Correct import
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AddCategory from './AddCategory';
import AddCarrito from './AddCarrito';
import CategoryDetailsScreen from './CategoryScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>  {/* Correct component */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Hola!' }}
        />
        <Stack.Screen name="Agrega Categoria" component={AddCategory} />
        <Stack.Screen name="Agrega Carrito" component={AddCarrito} />
        <Stack.Screen name="Categoria" component={CategoryDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
