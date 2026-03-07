# Manual de Usuario - API de Sistema de Inventario

## Introducción

Esta API REST permite gestionar un sistema de inventario que incluye productos, categorías, usuarios y administradores. Está construida con Node.js, Express y utiliza Supabase como base de datos, junto con Cloudinary para el manejo de imágenes.

### Base URL
```
http://localhost:3000/api/v1/
```

### Autenticación
La mayoría de los endpoints requieren autenticación mediante JWT (JSON Web Tokens). Para autenticarte:

1. Realiza un login (admin o usuario) para obtener un token.
2. Incluye el token en el header de las solicitudes:
   ```
   Authorization: Bearer <tu_token_aqui>
   ```

Los tokens tienen una duración de 1 hora.

## Endpoints

### Admin

#### Login de Administrador
- **Método:** `POST`
- **URL:** `/login`
- **Body (JSON):**
  ```json
  {
    "email": "admin@gmail.com",
    "password": "HolaMundo6"
  }
  ```

### Usuarios

#### Crear Usuario
- **Método:** `POST`
- **URL:** `/user`
- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON):**
  ```json
  {
    "name": "Kevin",
    "surname": "Mendoza",
    "phone": "0996312478",
    "address": "Santo Domingo",
    "email": "kevin.mendoza@gmail.com",
    "password": "HolaMundo1235"
  }
  ```

#### Listar Todos los Usuarios
- **Método:** `GET`
- **URL:** `/user`
- **Headers:** `Authorization: Bearer <token>`

#### Obtener Usuario Específico
- **Método:** `GET`
- **URL:** `/user/{id}`
- **Headers:** `Authorization: Bearer <token>`

#### Eliminar Usuario
- **Método:** `DELETE`
- **URL:** `/user/{id}`
- **Headers:** `Authorization: Bearer <token>`

#### Cambiar Estado de Usuario
- **Método:** `PATCH`
- **URL:** `/user/{id}/status`
- **Headers:** `Authorization: Bearer <token>`

#### Login de Usuario
- **Método:** `POST`
- **URL:** `/user/login`
- **Body (JSON):**
  ```json
  {
    "email": "juan.perez@gmail.com",
    "password": "1234567890"
  }
  ```

### Categorías

#### Crear Categoría
- **Método:** `POST`
- **URL:** `/categories`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Ropa",
    "description": "Prendas de vestir",
    "code": "ROP"
  }
  ```

#### Listar Categorías
- **Método:** `GET`
- **URL:** `/categories`
- **Headers:** `Authorization: Bearer <token>`

#### Obtener Categoría Específica
- **Método:** `GET`
- **URL:** `/categories/{id}`
- **Headers:** `Authorization: Bearer <token>`

#### Actualizar Categoría
- **Método:** `PUT`
- **URL:** `/categories/{id}`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Categoria actualizada",
    "code": "oik",
    "description": "Descripcion actualizada"
  }
  ```

#### Eliminar Categoría
- **Método:** `DELETE`
- **URL:** `/categories/{id}`
- **Headers:** `Authorization: Bearer <token>`

#### Cambiar Estado de Categoría
- **Método:** `PATCH`
- **URL:** `/categories/{id}`
- **Headers:** `Authorization: Bearer <token>`

### Productos

#### Crear Producto
- **Método:** `POST`
- **URL:** `/products/{category_id}`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body (Form-Data):**
  - `name`: "Ejemplo"
  - `description`: "Descripcion de ejemplo"
  - `imagen`: [Archivo de imagen]
  - `stock`: "12"
  - `price`: "10"

#### Listar Productos
- **Método:** `GET`
- **URL:** `/products`
- **Headers:** `Authorization: Bearer <token>`

#### Obtener Producto Específico
- **Método:** `GET`
- **URL:** `/products/{id}`
- **Headers:** `Authorization: Bearer <token>`

#### Cambiar Estado de Producto
- **Método:** `PATCH`
- **URL:** `/products/{id}`
- **Headers:** `Authorization: Bearer <token>`

#### Eliminar Producto
- **Método:** `DELETE`
- **URL:** `/products/{id}`
- **Headers:** `Authorization: Bearer <token>`

## Códigos de Estado y Errores

- **200 OK:** Solicitud exitosa.
- **201 Created:** Recurso creado exitosamente.
- **400 Bad Request:** Datos inválidos o faltantes.
- **401 Unauthorized:** Token faltante o inválido.
- **404 Not Found:** Recurso no encontrado.
- **500 Internal Server Error:** Error del servidor.

Las respuestas de error siguen el formato:
```json
{
  "ok": false,
  "msg": "Descripción del error"
}
```

## Notas Adicionales

- Las contraseñas deben tener entre 12 y 16 caracteres.
- Los números de teléfono deben tener exactamente 10 dígitos.
- Los códigos de categoría deben ser únicos.
- Las imágenes de productos se suben a Cloudinary y se devuelve la URL.
- Los usuarios y productos tienen un campo `status` que puede ser activado/desactivado.
- Para crear productos, se debe especificar el ID de la categoría en la URL.
