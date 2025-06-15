# React/TS To-do Manager

Una aplicación interactiva de gestión de tareas, desarrollada con React y TypeScript. Este proyecto ha sido construido aplicando principios de diseño de componentes y buenas prácticas de tipado estricto, lo que resulta en una interfaz de usuario eficiente y una base de código clara y mantenible.

![React/TS To-do Manager](public/img/og-image.png)

## 📋 Características

- **Gestión completa de tareas**: Crear, editar, marcar como completadas y eliminar tareas
- **Filtrado de tareas**: Visualiza todas las tareas, solo las pendientes o solo las completadas
- **Persistencia de datos**: Almacenamiento local para mantener tus tareas entre sesiones
- **Citas motivacionales**: Muestra citas aleatorias para inspirarte cada día
- **Diseño responsivo**: Experiencia de usuario optimizada para dispositivos móviles y de escritorio
- **Interfaz moderna**: Diseño limpio y minimalista con animaciones sutiles

## 🛠️ Tecnologías utilizadas

- **React 19**: Biblioteca de UI para construir interfaces de usuario
- **TypeScript**: Tipado estático para un código más robusto
- **Vite**: Herramienta de construcción rápida para desarrollo moderno
- **SASS**: Preprocesador CSS para estilos avanzados
- **Context API**: Gestión de estado global de la aplicación
- **Custom Hooks**: Lógica reutilizable para funcionalidades específicas
- **API de Citas**: Integración con API externa para mostrar citas motivacionales

## 🚀 Instalación y uso

1. Clona este repositorio:

   ```bash
   git clone https://github.com/codentide/ts-react-todo-app.git
   cd ts-react-todo-app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o con pnpm
   pnpm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con la siguiente variable:

   ```
   VITE_QUOTES_BASE_URL=https://api.quotable.io
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o con pnpm
   pnpm dev
   ```

5. Abre tu navegador en `http://localhost:5173`

## 📦 Estructura del proyecto

```
ts-react-todo-app/
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

## 🧪 Funcionalidades principales

- **Gestión de tareas**: Implementación completa de CRUD para tareas
- **Filtrado**: Filtros para visualizar tareas según su estado
- **Persistencia**: Uso de localStorage para guardar tareas entre sesiones
- **Citas diarias**: Integración con API externa para mostrar citas motivacionales
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla

## 👤 Autor

- **Marco Del Boccio**
  - [GitHub](https://github.com/codentide)
  - [LinkedIn](https://www.linkedin.com/in/marco-del-boccio-99b31824a/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
