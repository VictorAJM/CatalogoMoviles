import { Image, StyleSheet, Platform, SafeAreaView,FlatList,View, Button, Text, TouchableOpacity   } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '../components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Category from '../components/Category';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import AddCategory from './AddCategory';
import AddCarrito from './AddCarrito';
import CategoryDetailsScreen from '@/app/CategoryScreen'; 
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation(); 
  

  const fetchData = async () => {
    const db = await SQLite.openDatabaseAsync('databaseName');
    const allRows = await db.getAllAsync('SELECT * FROM testCategory');
    const categoriesList = allRows.map((row) => ({
      id: row.id,
      name: row.name,
      year: row.year,
      current: row.current,
      total: row.total,
    })).sort((a, b) => a.current - b.current);
    setCategories(categoriesList);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); 
    }, [])
  );

  const handleCategoryPress = (category) => {
    navigation.navigate('Categoria', category);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}

      headerImage={
        <Image
          source={require('../assets/images/Hot-Wheels-Emblema.png')}
          style={styles.hwLogo}
        />
      }>
      <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Agrega Categoria')}
            >
              <Text style={styles.buttonText}>Agrega categoria</Text>
            </TouchableOpacity>
          </View>
            <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Category
              name={item.name}  
              year={item.year}
              current={item.current}
              total={item.total}
              onPress= {() => handleCategoryPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          columnWrapperStyle={styles.row}
          />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  button: {
    height: 60,
    width: 200,
    backgroundColor: '#7594E9', 
    borderRadius: 8,             
    justifyContent: 'center',    
    alignItems: 'center',      
  },
  buttonText: {
    color: '#fff',           
    fontSize: 18,                 
    fontWeight: 'bold',           
  },
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
    justifyContent: 'space-between',
  },
});
