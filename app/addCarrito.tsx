import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';


export default function addCarrito({ navigation }) {
  const [name, setName] = useState('');
  const [hwID, setHWID] = useState('');
  const [categoryID, setCategoryID] = useState('');

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
  
    const result = await launchImageLibrary(options);
  
    if (result.didCancel) {
      console.log('El usuario canceló la selección');
    } else if (result.errorCode) {
      console.error('Error:', result.errorMessage);
    } else {
      const image = result.assets[0];
      console.log('Imagen seleccionada:', image);
      return image; // Retorna la imagen seleccionada
    }
  };

  const imageToBase64 = async (imageUri) => {
    try {
      const base64 = await RNFS.readFile(imageUri, 'base64');
      return base64;
    } catch (error) {
      console.error('Error al convertir imagen a base64:', error);
    }
  };



  const handleSubmit = async () => {
    if (!name || !hwID || !categoryID) {
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
      CREATE TABLE IF NOT EXISTS testCarritos (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL, 
        hwID TEXT NOT NULL,
        categoryID INTEGER);
      `);
    const allRows = await db.getAllAsync('SELECT * FROM testCarritos');
    for (const row of allRows) {
      if (row.name == name || row.hwID == hwID || row.categoryID == categoryID) {
        Toast.show({
          type: 'error', // Tipo de Toast, 'error' para error
          position: 'top', // Posición del Toast en la pantalla
          text1: 'El carrito ya ha sido agregado',
          text2: 'Revisa los datos ingresados',
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }
    }  
    const result = await db.runAsync('INSERT INTO testCarritos (name,hwID,categoryID) VALUES (?, ?, ?)', name,hwID, categoryID);
    Toast.show({
      type: 'success', // Tipo de Toast, 'success' para éxito
      position: 'top',
      text1: 'Carrito guardada',
      text2: 'El carrito se ha guardado correctamente.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Carrito</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Hot Wheels ID"
        value={hwID}
        onChangeText={setHWID}
      />

      <TextInput
        style={styles.input}
        placeholder="ID en la categoria"
        keyboardType="numeric"
        value={categoryID}
        onChangeText={setCategoryID}
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
    marginTop: 20,  
    width: '50%',
  },
});