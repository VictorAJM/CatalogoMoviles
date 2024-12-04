import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Carrito from '@/components/Carrito'; 

export default function CategoryDetailsScreen({ route, navigation })  {
  const { id, name, year, current, total } = route.params; // Extraer los parámetros
  const [carritos, setCarritos] = useState([]);
  const [actual, setActual] = useState(current);
  const [lista, setLista] = useState([]);

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

    const allCategoryIDs = Array.from({ length: total }, (_, index) => index + 1);

    // Get the categoryIDs from the carritosList
    const existingCategoryIDs = carritosList.map((carrito) => carrito.categoryID);
  
    // Filter out the categoryIDs that already exist in carritosList
    const missingCategoryIDs = allCategoryIDs.filter((id) => !existingCategoryIDs.includes(id));
    console.log(missingCategoryIDs);
    setLista(missingCategoryIDs);
    setActual(carritosList.length);
    setCarritos(carritosList);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); 
    }, [])
  );

  console.log(actual);

  return (
    <SafeAreaView style={styles.container}>
      {actual < total && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Agrega Carrito', {categoryName: name ,total: total, lista: lista})}
        >
          <Text style={styles.buttonText}>Agrega carrito</Text>
        </TouchableOpacity>
      )}
  
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
        contentContainerStyle={styles.listContainer}  // Estilo adicional para el contenido de la lista
        ItemSeparatorComponent={() => <View style={styles.separator} />}  // Separadores entre elementos
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',  // Fondo suave para la pantalla
  },
  button: {
    backgroundColor: '#4CAF50',  // Color verde para el botón
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,  // Sombra para el botón
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',  // Texto blanco
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,  // Espacio en la parte inferior de la lista
  },
  separator: {
    height: 10,  // Separador entre items
    backgroundColor: '#f0f0f0',  // Color del separador
  },
});