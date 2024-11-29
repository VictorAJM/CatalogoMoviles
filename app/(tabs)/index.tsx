import { Image, StyleSheet, Platform, SafeAreaView,FlatList,View, Button, Text   } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Category from '@/components/Category';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default async function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation(); 

  const fetchData = async () => {
    const db = await SQLite.openDatabaseAsync('databaseName');
    const allRows = await db.getAllAsync('SELECT * FROM testCategory');
    const categoriesList = allRows.map((row) => ({
      id: row.id, // Asumiendo que tienes un campo 'id' en tu base de datos
      name: row.name,
      year: row.year,
      current: row.current,
      total: row.total,
    }));

    setCategories(categoriesList);
  };

  // Usar useFocusEffect para volver a cargar los datos cada vez que la pantalla reciba el foco
  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // Recargar los datos al recibir el foco
    }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}

      headerImage={
        <Image
          source={require('@/assets/images/Hot-Wheels-Emblema.png')}
          style={styles.hwLogo}
        />
      }>
      <SafeAreaView style={styles.container}>
        <Button
          title="Agrega categoria"
          onPress={() => navigation.navigate('addCategory')} // Navegar a la segunda pantalla
        />
            <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Category
              name={item.name}
              year={item.year}
              current={item.current}
              total={item.total}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2} // Config for 2 columns
          columnWrapperStyle={styles.row} // Spacing between rows
          />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  hwLogo: {
    height: 100,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between', // Espaciado entre columnas
  },
});
