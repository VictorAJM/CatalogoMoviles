import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';


export default function AddCategory({ navigation }) {

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async () => {
    if (!name || !year || !quantity) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Campos incompletos',
        text2: 'Por favor, llena todos los campos antes de guardar.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return; 
    }


    const db = await SQLite.openDatabaseAsync('databaseName');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS testCategory (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL, 
        year INTEGER,
        current INTEGER,
        total INTEGER);
      `);
      const allRows = await db.getAllAsync('SELECT * FROM testCategory');
      
      for (const row of allRows) {
        
        if (row.name == name) {
          console.log(row.name);
          Toast.show({
            type: 'error', 
            position: 'top',
            text1: 'Categoría ya existente',
            text2: 'La categoría con este nombre ya está registrada.',
            visibilityTime: 3000,
            autoHide: true,
          });
          return;
        }
      }
      
      const result = await db.runAsync('INSERT INTO testCategory (name,year,current, total) VALUES (?, ?, ?, ?)', name,year,0, quantity);
      Toast.show({
        type: 'success', 
        position: 'top',
        text1: 'Categoría guardada',
        text2: 'La categoría se ha guardado correctamente.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Categoría</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Año"
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        value={year}
        onChangeText={setYear}
      />

      <TextInput
        style={styles.input}
        placeholder="Tamaño de la categoría"
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        value={quantity}
        onChangeText={setQuantity}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Guardar" onPress={handleSubmit} color="#4CAF50" />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Regresar" onPress={() => navigation.goBack()} color="#f44336" />
        </View>
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '60%', 
    borderRadius: 8,
    overflow: 'hidden', 
  },
});
