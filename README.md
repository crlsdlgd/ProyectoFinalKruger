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
- Todos los usuarios pueden actualizar sus datos (excepto el email).
- Ningún usuario puede actualizar la contraseña de otro.
- Actualización de contraseña propia.
- **Rol Administrador**:
  - Búsqueda, filtrado y ordenamiento de usuarios.
  - Modificación de datos y roles de usuarios.
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
5.1. O en produccion
```bash
npm start
```
> El backend se ejecutará en el puerto **3000**.
### 3️⃣ Configuración del Frontend
1. Ir a la carpeta flatfinderfront.

2. Ejecutar en desarrollo:
```bash
npm run dev
```
2.1. Ejecutar en desarrollo:
```bash
npm start
```
> El frontend se ejecutará en el puerto **5173**
## 💻 Uso
1. Ir a http://localhost:5173/.

2. Iniciar sesión o registrarse.

3. Explorar y filtrar departamentos.

4. Crear, editar o eliminar tus publicaciones.

5. Marcar favoritos, añadir comentarios, y más.

## 📷 Capturas de pantalla
### Login
![login image](flatfinderfront/public/assets/login.png)
### Registro
![register image](flatfinderfront/public/assets/register.png)
### Menú Principal
![menu image](flatfinderfront/public/assets/menu.png)
### Home
![home image](flatfinderfront/public/assets/home1.png)
![home image](flatfinderfront/public/assets/home2.png)
### Crear Publicación
![newflat image](flatfinderfront/public/assets/newflat.png)
![newflat2 image](flatfinderfront/public/assets/newflat2.png)
### Detalle del departamento
![flatdetail image](flatfinderfront/public/assets/flatdetail.png)
### Favoritos
![favorites image](flatfinderfront/public/assets/favorites.png)
### Gestión de usuarios (Admin)
![users image](flatfinderfront/public/assets/users.png)
![userdetail image](flatfinderfront/public/assets/userdetail.png)
![useredit image](flatfinderfront/public/assets/useredit.png)
### Actualizar contraseña
![updatepassword image](flatfinderfront/public/assets/updatepassword.png)

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**

## 👥 Créditos
- Carlos Delgado
- Alejandro Orrellana
