import { Image, StyleSheet, Platform, SafeAreaView,FlatList  } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Category from '@/components/Category';


export default async function HomeScreen() {
  const categories = [
    { id: '1', name: 'Technology', year: 2024, objectCount: 15 },
    { id: '2', name: 'Science', year: 2023, objectCount: 20 },
    { id: '3', name: 'Art', year: 2022, objectCount: 8 },
    { id: '4', name: 'History', year: 2021, objectCount: 12 },
  ];
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
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Category
              name={item.name}
              year={item.year}
              objectCount={item.objectCount}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2} // Configuración para 2 columnas
          columnWrapperStyle={styles.row} // Espaciado entre filas
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
