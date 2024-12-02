import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

interface CarritoProps {
  image: string;
  name: string;
  year: number;
  category: string;
  categoryTotal: number;
  categoryID: number;
  hwID: string;
}


const Carrito: React.FC<CarritoProps> = ({
  image, name, year, category, categoryTotal, categoryID, hwID
}) => {
  return     <View style={styles.card}>
  <Image source={{ uri: image }} style={styles.image} />
  <View style={styles.textContainer}>
    <Text style={styles.categoryTitle}>
      {`${category} - ${year}  (${categoryID}/${categoryTotal})`}
    </Text>
    <Text style={styles.title}>Nombre: {name}</Text>
    <Text style={styles.hwText}>hwID: {hwID}</Text>
  </View>
</View>
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Disposición horizontal para la imagen y el texto
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 120, // Hacer el card más grande
  },
  image: {
    width: 80, // Imagen más grande
    height: 80,
    borderRadius: 10, // Esquinas redondeadas
    marginRight: 15, // Espacio entre la imagen y el texto
  },
  textContainer: {
    flex: 1, // Ocupa el espacio restante
    justifyContent: 'space-between', // Espaciado entre textos
  },
  categoryTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  hwText: {
    fontSize: 14,
    color: '#888',
  },
});


export default Carrito;