import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import Carrito from '@/components/Carrito';

export default function CategoryDetailsScreen({ route, navigation }) {
  const { current, id, name, total, year } = route.params; // Extract parameters
  const [carritos, setCarritos] = useState([]);
  const [actual, setActual] = useState(current);

  // Fetch data and set up the list of missing category IDs
  const fetchData = async () => {
    const db = await SQLite.openDatabaseAsync('databaseName');
    const allRows = await db.getAllAsync('SELECT * FROM testCarritos');
    const carritosList = allRows.map((row) => ({
      id: row.id,
      image: row.image,
      name: row.name,
      year: year,
      category: row.category,
      categoryID: row.categoryID,
      hwID: row.hwID,
    })).filter((row) => row.category == name)
    .sort((a, b) => a.categoryID - b.categoryID);
    setCarritos(carritosList);
    setActual(carritosList.length);
  };

  // Call fetchData when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Button press handler
  const handleAddCarrito = () => {
    navigation.navigate('Agrega Carrito', { categoryName: name, total: total });
  };

  return (
    <SafeAreaView style={styles.buttonContainer}>
      {actual < total && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddCarrito} // Navigate only when the button is pressed
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
        contentContainerStyle={styles.listContainer}  // Additional styling for the list container
        ItemSeparatorComponent={() => <View style={styles.separator} />}  // Separator between items
      />
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}// Navigate only when the button is pressed
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',  // Soft background color for the screen
  },
  button: {
    backgroundColor: '#4CAF50',  // Green color for the button
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,  // Shadow for the button
  },
  buttonBack: {
    backgroundColor: '#f44336',  // Green color for the button
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,  // Shadow for the button
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',  // White text
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,  // Bottom padding for the list
  },
  separator: {
    height: 10,  // Separator height between items
    backgroundColor: '#f0f0f0',  // Separator color
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 20,
    
  },
  buttonWrapper: {
    width: '60%', 
    borderRadius: 8,
    overflow: 'hidden', 
  },
});
