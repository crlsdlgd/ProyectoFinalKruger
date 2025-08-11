# 🏠 FLAT FINDER

## 📌 Descripción
**Flat Finder** es el proyecto de graduación del bootcamp de Fullstack de **Carlos Delgado** y **Alejandro Orellana**.  
Su objetivo es resolver el problema de **búsqueda y publicación de departamentos en arrendamiento**, brindando una plataforma completa para inquilinos y arrendadores.

---

## ✨ Funcionalidades
- Registro y acceso de usuarios.
- Creación de publicaciones de departamentos en arrendamiento.
- Búsqueda, filtrado y ordenamiento de publicaciones.
- Marcado de publicaciones como **favoritas**.
- Añadir comentarios a publicaciones.
- **Rol Administrador**:
  - Búsqueda, filtrado y ordenamiento de usuarios.
  - Modificación de datos y roles de usuarios.
- Todos los usuarios pueden actualizar sus datos (excepto el email).
- Ningún usuario puede actualizar la contraseña de otro.
- Actualización de contraseña propia.

---

## 🛠 Tecnologías Utilizadas

### **Frontend**
- React 18.3.1
- TailwindCSS 3.4.16
- HeroUI 2.7.6

### **Backend**
- Node.js 22.13.1
- Express 4.21.2
- bcrypt 5.1.1
- crypto 1.0.1
- mongoose 8.13.2
- JSON Web Token 9.0.2

### **Base de Datos**
- MongoDB Atlas

---

## 🚀 Despliegue e Instalación

### 1️⃣ Clonar el proyecto
```bash
git clone https://github.com/crlsdlgd/ProyectoFinalKruger.git
```
### 2️⃣ Configuración del Backend
1. Ir a la carpeta flatfinderback.

2. Copiar el archivo .env.example y renombrarlo como .env

3. Completar las variables de entorno según tu configuración.

4. Instalar dependencias
```bash
npm install
```
5. Ejecutar en desarrollo
```bash
npm run start:dev
```
> O en produccion
```bash
npm start
```
> El backend se ejecutará en el puerto **3000**.
