import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

export default function AddCategory({ navigation }) {

  const [name, setName] = useState('');
  const [year, setYear] = useState(2022);
  const [quantity, setQuantity] = useState(5);

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

<View style={styles.buttonContainer}>
            <Text style={styles.label}>Año de la categoria</Text>

            <Picker
              selectedValue={quantity} // Bind the selected value to quantity state
              onValueChange={(itemValue) => setYear(itemValue)} // Update quantity when the value changes
              style={styles.picker}
            >
              <Picker.Item label="2022" value={2022} />
              <Picker.Item label="2023" value={2023} />
              <Picker.Item label="2024" value={2024} />
            </Picker>
          </View>

      <View style={styles.buttonContainer}>
            <Text style={styles.label}>Tamaño de la categoría</Text>

            <Picker
              selectedValue={quantity} // Bind the selected value to quantity state
              onValueChange={(itemValue) => setQuantity(itemValue)} // Update quantity when the value changes
              style={styles.picker}
            >
              <Picker.Item label="5" value={5} />
              <Picker.Item label="10" value={10} />
            </Picker>
          </View>

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
  pickerContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
