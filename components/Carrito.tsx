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
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryTitle}>
          {`${category} - ${year}   (${categoryID}/${categoryTotal})`}
        </Text>
        <Text style={styles.title}>Nombre: {name}</Text>
        <Text style={styles.hwText}>Hot Wheels ID: {hwID}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Disposición horizontal para la imagen y el texto
    alignItems: 'center',
    padding: 20,  // Aumentar espacio dentro del card
    marginVertical: 12,  // Aumentar el espacio entre cards
    backgroundColor: '#fff',
    borderRadius: 15,  // Bordes más redondeados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    minHeight: 140, // Aumentar la altura mínima
  },
  image: {
    width: 90, // Imagen más grande
    height: 90,
    borderRadius: 15, // Esquinas redondeadas
    marginRight: 20, // Aumentar espacio entre la imagen y el texto
  },
  textContainer: {
    flex: 1,  // Ocupa el espacio restante
    justifyContent: 'flex-start',  // Alinear los textos al inicio
  },
  categoryTitle: {
    fontSize: 18,  // Aumentar tamaño de fuente
    color: '#4A4A4A',  // Color más suave
    marginBottom: 8,  // Aumentar el espacio entre líneas
  },
  title: {
    fontSize: 20,  // Aumentar tamaño de fuente
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,  // Espacio entre textos
  },
  hwText: {
    fontSize: 16,  // Aumentar tamaño de fuente
    color: '#6A6A6A',  // Color suave para el HW ID
  },
});



export default Carrito;