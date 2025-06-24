<div align="center">
  <a href="https://ts-react-todo-manager.netlify.app" target="_blank">
    <img src="./public/img/og-image.png" style="border-radius:12px;" /> 
  </a>
  <h3 style="font-size:32px;">
    <strong>TS/React To-do Manager</strong>
  </h3>
  <p>Una aplicación interactiva de gestión de tareas, desarrollada con React y TypeScript. Este proyecto ha sido construido aplicando principios de diseño de componentes y buenas prácticas de tipado estricto, lo que resulta en una interfaz de usuario eficiente y una base de código clara y mantenible.</p>

<a href="https://ts-react-todo-manager.netlify.app" target="_blank">Live Demo</a>

  <div align="center">

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![React](https://img.shields.io/badge/React-323232.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![Zustand](https://img.shields.io/badge/Zustand-433e38?style=for-the-badge&logo=react&logoColor=f8ad00)](https://zustand-demo.pmnd.rs/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

  </div>

</div>

## 🧪 Funcionalidades principales

- **Gestión de tareas**: Implementación completa de CRUD para tareas
- **Filtrado**: Filtros para visualizar tareas según su estado
- **Persistencia**: Uso de localStorage para guardar tareas entre sesiones
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla

## 🧭 Guía de uso

- **Crear tarea:** Haga click en el campo de texto, coloque un nombre para la tarea y presione `enter`
- **Editar tarea:** Haga doble click en el titulo de la tarea y coloque un nuevo nombre para la tarea
- **Completar tarea:** Haga click en el checkbox a la izquierda de la tarea para completar o descompletar la tarea
- **Eliminar tarea:** Coloque la flecha del mouse encima de la tarea que desea eliminar y haga click en la `x` al lado derecho de la tarea
- **Filtrar tareas:** Presione alguno de los botones de filtro al final de la lista de tareas
- **Limpiar tareas completadas:** Al tener tareas completadas aparecerá un botón "clear done" al presionarlo se borrarán todas las tareas completadas

## 📦 Estructura del proyecto

```
ts-react-todo-manager/
├── public/               # Archivos estáticos
├── src/
│   ├── assets/           # Recursos (SVGs, imágenes)
│   ├── components/       # Componentes React
│   ├── context/          # Contexto global para gestión de tareas
│   ├── hooks/            # Custom hooks (localStorage, quotes)
│   ├── scss/             # Estilos SASS organizados por componentes
│   ├── App.tsx           # Componente principal
│   ├── constants.ts      # Constantes de la aplicación
│   ├── main.tsx          # Punto de entrada
│   └── types.d.ts        # Definiciones de tipos TypeScript
└── ...                   # Archivos de configuración
```

## 🚀 Instalación y uso

1. Clona este repositorio:

   ```bash
   git clone https://github.com/codentide/ts-react-todo-manager.git
   cd ts-react-todo-manager
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o con pnpm
   pnpm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o con pnpm
   pnpm dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT
