import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, SafeAreaView, PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
export default function AddCarrito({ route, navigation }) {
  const { categoryName } = route.params;
  const [name, setName] = useState('');
  const [hwID, setHWID] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [message, setMessage] = useState("Sin imagen guardada");
  const [photoMessage, setPhotoMessage] = useState("Tomar foto");
  const [image64, setImage64] = useState('');
  const [imageUri, setImageUri] = useState('');

  const updateMessage = () => {
    setMessage("Imagen Guardada"); // Cambia a un nuevo mensaje
  };

  const updatePhotoMessage =  () => {
    setPhotoMessage("Volver a tomar foto");
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const wasGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (wasGranted) return true;
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permiso de cámara',
            message: 'Esta aplicación necesita acceso a tu cámara.',
            buttonNeutral: 'Pregúntame luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permiso de cámara otorgado');
          return true;
        } else {
          console.log('Permiso de cámara denegado');
          return false;
        }
      } catch (err) {
        console.warn('Error al solicitar permiso:', err);
      }
    }
    return true;
  };

  const selectImage = async () => {
    const granted = await requestGalleryPermission();
    if (!granted) return;
    ImagePicker.launchCameraAsync({ 
      mediaType: 'photo', 
      base64: true,  
      maxHeight: 200, 
      maxWidth: 200, 
  }).then((response) => {
      
      if (!response.canceled) {
          const base64Image = response.assets[0];
          console.log(base64Image);
          setImage64(base64Image.base64);
          setImageUri(base64Image.uri);
          updatePhotoMessage();
          updateMessage();
          return;
      } else {
          console.log(response); 
      }
  }).catch((error) => {
      console.log(error); 
  

  })};


  const handleSubmit = async () => {
    if (!name || !hwID || !categoryID || image64 === null) {
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

    const formattedHwID = /^[A-Z]{3}[0-9]{2}$/; // i para que no sea case-sensitive
    if (!formattedHwID.test(hwID)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Formato incorrecto',
        text2: 'El ID del Hot Wheels debe tener el formato correcto.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }
  
    const db = await SQLite.openDatabaseAsync('databaseName');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS testCarritos (
        id INTEGER PRIMARY KEY NOT NULL,
        image BLOB,
        name TEXT NOT NULL, 
        hwID TEXT NOT NULL,
        category TEXT,
        categoryID INTEGER);
      `);
    const allRows = await db.getAllAsync('SELECT * FROM testCarritos');
    for (const row of allRows) {
      if (row.name == name || row.hwID == hwID || (row.categoryID == categoryID && row.category == categoryName)) {
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

    const result = await db.runAsync('INSERT INTO testCarritos (image, name,hwID,category, categoryID) VALUES (?, ?, ?, ?, ?)', imageUri, name,hwID,categoryName, categoryID);
    const result2 = await db.runAsync(`UPDATE testCategory SET current = current + 1 WHERE name = ?`,categoryName );
    if (result2 !== null) {
      Toast.show({
        type: 'success', // Tipo de Toast, 'success' para éxito
        position: 'top',
        text1: 'Carrito guardada',
        text2: 'El carrito se ha guardado correctamente.',
        visibilityTime: 3000,
        autoHide: true,
      });
    } 
    return;
}

  const getMessageStyle = () => {
    if (!message) return {};
    if (message.includes("Sin")) {
      return styles.errorMessage; 
    } else {
      return styles.successMessage; 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Carrito</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Hot Wheels ID"
        placeholderTextColor="#888"
        value={hwID}
        onChangeText={setHWID}
      />

      <TextInput
        style={styles.input}
        placeholder="ID en la categoria"
        keyboardType="numeric"
        placeholderTextColor="#888"
        value={categoryID}
        onChangeText={setCategoryID}
      />

{message ? <Text style={[styles.message, styles.successMessage]}>{message}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title={photoMessage} onPress={selectImage} color="#2196F3" />
      </View>

      {imageUri ? (
      <Image source={{ uri: imageUri }} style={styles.image} />) : null}

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSubmit} color="#4CAF50" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Regresar" onPress={() => navigation.goBack()} color="#f44336" />
      </View>
      <Toast ref={(ref: any) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
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
  message: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#f44336', 
    backgroundColor: '#ffebee', 
  },
  successMessage: {
    color: '#4CAF50',  
    backgroundColor: '#e8f5e9', 
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
    borderRadius: 8,
    overflow: 'hidden', 
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#ccc', 
  },
});
