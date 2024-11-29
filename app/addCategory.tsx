import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
export default function addCategory({ navigation }) {

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [quantity, setQuantity] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'success', // Puedes elegir 'success', 'error', o 'info'
      position: 'bottom', // También puede ser 'top' o 'center'
      text1: '¡Éxito!',
      text2: 'El mensaje se ha enviado correctamente.',
      visibilityTime: 3000, // Tiempo en milisegundos que el Toast será visible
      autoHide: true, // Si el Toast se oculta automáticamente
    });
  };

  const handleSubmit = async () => {
    const db = await SQLite.openDatabaseAsync('databaseName');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS testCategory (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL, 
        year INTEGER,
        quantity INTEGER);
      `);
      await db.runAsync('INSERT INTO testCategory (name,year,quantity) VALUES (?, ?, ?)', "a",20, 1);
      const allRows = await db.getAllAsync('SELECT * FROM testCategory');
      for (const row of allRows) {
        
        if (row.name == name) {
          console.log(row.name);
          Toast.show({
            type: 'error', // Tipo de Toast, 'error' para error
            position: 'top', // Posición del Toast en la pantalla
            text1: 'Categoría ya existente',
            text2: 'La categoría con este nombre ya está registrada.',
            visibilityTime: 3000,
            autoHide: true,
          });
          return;
        }
      }
      
      const result = await db.runAsync('INSERT INTO testCategory (name,year,quantity) VALUES (?, ?, ?)', name,year, quantity);
      //mostrar toast de que funciono correctamente
      Toast.show({
        type: 'success', // Tipo de Toast, 'success' para éxito
        position: 'top',
        text1: 'Categoría guardada',
        text2: 'La categoría se ha guardado correctamente.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Nueva Categoría</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Año"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />

      <TextInput
        style={styles.input}
        placeholder="cantidad de objetos en la categoría"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSubmit} />
      </View>

      {/* Botón para regresar a la pantalla anterior */}
      <View style={styles.buttonContainer}>
        <Button title="Regresar" onPress={() => navigation.goBack()} />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 45,
    marginBottom: 15,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,  // Agregar espacio entre los botones
    width: '50%',  // Asegura que los botones usen todo el ancho disponible
  },
});