# Instalar aplicación
Para instalar el proyecto, correr los siguientes comandos

- docker-compose build
- docker-compose up
 
Una vez estos comandos hallan sido lanzado, el API estará en el puerto 4000


# Ubicación del API

La URL sería: localhost:4000;

Las rutas que tenemos en el proyecto son las siguientes:

**GET /collection**

Obtiene la colección según los query params, estos pueden ser, cualquier de los campos del modelo

**GET /allcollections**

Obtiene todas las colecciones creadas.
 
**PUT /collections/:id**

Modifica la colección según el ID que selecciones, en caso no encontrarlo, creará una nueva colección con el body ingresado.

**POST /create**

Crea una nueva coleccion con el modelo.

**DELETE /collection**

Elimina uno o mas documentos de la coleccion según los query params que se ingresen.

## Modelo
El modelo de es el siguiente:

message:**string**

scope:**string**

host:**string**

date:**string**

location:**string**