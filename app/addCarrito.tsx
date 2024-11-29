import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

export default function addCarrito({ navigation }) {
  const [name, setName] = useState('');
  const [hwID, setHWID] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const options = {
    mediaType: 'photo',
    title: 'Select Image',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.8,
  };
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // Solicitar el permiso si no está otorgado
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permiso de camara',
            message: 'Esta aplicación necesita acceso a tu camara para tomar imágenes.',
            buttonNeutral: 'Luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          }
        );
        return granted == PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error al solicitar permisos:', err);
        return false;
      }
    }
    return true; // iOS no requiere este permiso explícitamente
  };

  const selectImage = async () => {
    const hasPermission = await requestGalleryPermission();
  
    if (!hasPermission) {
      console.log('No se otorgó permiso a la camara');
      return;
    }
    console.log("ojo");
    const result = (await launchCamera(options as any)) as {
      assets: MimeType[];
    };

    console.log('result' , result);

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

      <View style={styles.buttonContainer}>
        <Button title="Tomar foto" onPress={selectImage} />
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