import * as React from 'react';
import {NavigationContainer, NavigationIndependentTree} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AddCategory from './AddCategory';
import AddCarrito from './AddCarrito';
import CategoryDetailsScreen from './CategoryScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Hola!'}}
        />
        <Stack.Screen name="Agrega Categoria" component={AddCategory} />
        <Stack.Screen name="Categoria" component={CategoryDetailsScreen} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
};

export default MyStack;