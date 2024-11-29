import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Button,
  View,
} from 'react-native';
import Carrito from '@/components/Carrito'; 
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const CategoryDetailsScreen = ({ route }) => {
  const { name, year, current, total } = route.params; // Extraer los parámetros
  const navigation = useNavigation();
  const [carritos, setCarritos] = useState([
    {
      id: 1,
      name: 'Carrito A',
      year: 2023,
      category: 'Sports',
      categoryID: 1,
      hwID: 'HW123',
    },
    {
      id: 2,
      name: 'Carrito B',
      year: 2022,
      category: 'Classics',
      categoryID: 2,
      hwID: 'HW124',
    },
    // Agrega más objetos de carrito según sea necesario
  ]);


  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Agrega carrito"
        onPress={() => navigation.navigate('addCarrito')} // Navegar a la pantalla de agregar carrito
      />
      <FlatList
        data={carritos}
        renderItem={({ item }) => (
          <Carrito
            name={item.name}
            year={item.year}
            category={name}
            categoryTotal={total}
            categoryID={item.categoryID}
            hwID={item.hwID}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

});

export default CategoryDetailsScreen;
