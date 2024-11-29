# Proyecto Final: Dispositivos Inteligentes

## Milestones Detallados

### **1. Configuración Inicial** 

- [X] **Configurar el entorno:**
  - Instalar Node.js, Expo CLI, y configurar un proyecto de React Native.
  - Instalar dependencias principales:
    - `react-navigation`
    - Librerías de diseño (`react-native-paper`, `styled-components`, etc.).
    - `expo-sqlite` o `react-native-sqlite-storage` para manejar SQLite.
- [X] **Definir la estructura del proyecto:**
  - Crear carpetas base:
    - `screens`, `components`, `services`, y `assets`.
- [X] **Configurar la base de datos SQLite:**
  - **Tabla Categorías**

- [X] **Configurar la base de datos SQLite:**
  - **Tabla Productos**

---

### **2. Desarrollo de Pantalla Principal**

- [X] **Diseño del UI:**
  - Crear la pantalla inicial para mostrar categorías como cuadros o tarjetas.
  - Añadir un campo de entrada y un botón para agregar nuevas categorías.
- [X] **Funcionalidad:**
  - Conectar la pantalla inicial a SQLite:
    - Consultar y mostrar las categorías disponibles.
    - Permitir agregar nuevas categorías (validar entradas para evitar duplicados).
  - Implementar navegación a la pantalla de productos al seleccionar una categoría.
- [X] **Pruebas:**
  - Verificar que las categorías se guardan y se muestran correctamente.

---

### **3. Desarrollo de la Pantalla de Productos**

- [X] **Diseño del UI:**
  - Crear una lista estilizada para mostrar productos de la categoría seleccionada.
  - Añadir un campo de entrada y un botón para agregar nuevos productos.
- [ ] **Funcionalidad:**
  - Consultar productos relacionados a la categoría seleccionada desde SQLite.
  - Permitir agregar nuevos productos con:
    - Nombre
    - Descripción
    - Imagen (almacenada como BLOB en SQLite).
  - Asociar productos a categorías mediante claves foráneas.
- [ ] **Estilización:**
  - Diseñar la lista de productos mostrando:
    - Nombre
    - Descripción
    - Imagen en miniatura.
- [ ] **Pruebas:**
  - Verificar que los productos se muestran y actualizan correctamente.

---

### **4. Mejora de la Presentación** Opcional 

- [ ] **Optimización de la Interfaz:**
  - Ajustar el diseño para dispositivos móviles.
  - Implementar un tema de colores y estilos consistentes.
- [ ] **Animaciones:**
  - Añadir transiciones al abrir pantallas o actualizar listas.

---

### **5. Pruebas**

- [ ] **Pruebas Completas:**
  - Revisar todas las funciones principales:
    - Agregar categorías/productos.
    - Consultar listas.
    - Manejar errores o entradas inválidas.
  - Probar la aplicación en distintos dispositivos/emuladores.

---

## Productos Incluidos

Cada producto debe incluir:

- **Nombre:** Título claro del producto.
- **Descripción:** Breve detalle del producto.
- **Imagen:** Almacenada como BLOB en SQLite.

**Ejemplo visual:**

- **Categoría:** Tecnología
  - **Producto:** Laptop X
    - **Descripción:** Procesador Intel i7, 16GB RAM.
    - **Imagen:** Mostrada desde los datos almacenados en SQLite.

---

## Rúbrica de Evaluación

- **Uso de una fuente de datos como SQLite:** 60%
- **Funcionamiento completo de la aplicación con React Native:** 30%
- **Buena presentación de la aplicación (estilo, diseño, etc.):** 10%
