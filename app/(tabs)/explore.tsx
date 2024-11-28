import { StyleSheet, Image, Platform, SafeAreaView, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Category from '@/components/Category';
import Carrito from '@/components/Carrito';

export default function TabTwoScreen() {

  const carritos = [
    {id: '1', name: 'PUNK ROD', year: 2024, Category:'Rod Squad', categoryID: 1,  hwID: 'HRY48'},
    {id: '2', name: 'HONDA CB750 CAFÉ', year: 2024, Category:'Rod Squad', categoryID: 2, hwID: 'HTC61'},
    {id: '3', name: 'LIMITED GRIP', year: 2024, Category:'Rod Squad', categoryID: 3, hwID: 'HTC62'},
    {id: '4', name: "CUSTOM '53 CHEVY", year: 2024, Category:'Rod Squad', categoryID: 4, hwID: 'HTF18'},
    {id: '5', name: 'HIROHATA MERC', year: 2024, Category:'Rod Squad', categoryID: 5, hwID: 'HTD66'},
    {id: '6', name: 'SHARK BITE', year: 2024, Category:'HW Mega Bite', categoryID: 1, hwID: 'HTC01'},
    {id: '7', name: 'CROC ROD', year: 2024, Category:'HW Mega Bite', categoryID: 2, hwID: 'HTC02'},
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={carritos}
          renderItem={({ item }) => (
            <Carrito
              name={item.name}
              year={item.year}
              category={item.Category}
              categoryID={item.categoryID}
              hwID={item.hwID}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between', // Espaciado entre columnas
  },
});
