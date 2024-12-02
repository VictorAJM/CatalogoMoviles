import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
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


export default function CategoryDetailsScreen({ route, navigation })  {
  const { id, name, year, current, total } = route.params; // Extraer los parámetros
  const [carritos, setCarritos] = useState([]);

  const fetchData = async () => {
    const db = await SQLite.openDatabaseAsync('databaseName');
    const allRows = await db.getAllAsync('SELECT * FROM testCarritos');
    const carritosList = allRows.map((row) => ({
      id: row.id, // Asumiendo que tienes un campo 'id' en tu base de datos
      image: row.image,
      name: row.name,
      year: year,
      category: row.category,
      categoryID: row.categoryID,
      hwID: row.hwID,
    })).filter((row)=> row.category == name)
    .sort((a, b) => a.categoryID - b.categoryID);

    setCarritos(carritosList);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); 
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {current < total && (      <Button
        title="Agrega carrito"
        onPress={() => navigation.navigate('Agrega Carrito', {categoryName: name})} // Navegar a la pantalla de agregar carrito
      />)}

      <FlatList
        data={carritos}
        renderItem={({ item }) => (
          <Carrito
            image={item.image}
            name={item.name}
            year={item.year}
            category={item.category}
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
