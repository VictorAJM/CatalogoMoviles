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
import Carrito from '../components/Carrito';

export default function CategoryDetailsScreen({ route, navigation }) {
  const { current, id, name, total, year } = route.params; 
  const [carritos, setCarritos] = useState([]);
  const [actual, setActual] = useState(current);

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

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleAddCarrito = () => {
    navigation.navigate('Agrega Carrito', { categoryName: name, total: total });
  };

  return (
    <SafeAreaView style={styles.buttonContainer}>
      {actual < total && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddCarrito} 
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
        contentContainerStyle={styles.listContainer}  
        ItemSeparatorComponent={() => <View style={styles.separator} />} 
      />
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
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
    backgroundColor: '#f8f8f8',  
  },
  button: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3, 
  },
  buttonBack: {
    backgroundColor: '#f44336', 
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,  
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', 
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,  
  },
  separator: {
    height: 10,  
    backgroundColor: '#f0f0f0',
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
