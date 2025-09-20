# Task Manager Frontend

<p align="center">
  <img src="https://vuejs.org/images/logo.png" width="150" alt="Vue Logo">
  <img src="https://tailwindcss.com/_next/static/media/twitter.3d6346b7.svg" width="150" alt="Tailwind Logo">
</p>

## Overview

This is the **Vue 3** + **Pinia** + **Tailwind CSS** front-end for the Task Manager application. It connects to the Laravel backend API, supports JWT authentication, task CRUD operations, and real-time notifications via Laravel Echo & Pusher.

## Features

- User login/register with JWT  
- Task listing, filtering, creation, update, deletion  
- Real-time task creation notifications  
- Persistent auth state with Pinia & localStorage  

## Prerequisites

- Node.js 16+  
- npm or yarn  
- Access to backend API with valid JWT endpoints  

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/task-manager-frontend.git
cd task-manager-frontend
```

2. Install dependencies:
```bash
npm install
```
or
```bash
yarn install
```

3. Copy `.env.example` to `.env` and configure:
```env
VITE_PUSHER_APP_KEY=your_pusher_key
VITE_PUSHER_APP_CLUSTER=your_pusher_cluster
VITE_PUSHER_APP_FORCE_TLS=true
```

4. Run the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```

5. Build for production:
```bash
npm run build
```
or
```bash
yarn build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration

# Pusher Configuration for Real-time Notifications
VITE_PUSHER_APP_KEY=your_pusher_app_key_here
VITE_PUSHER_APP_CLUSTER=your_pusher_cluster_here
VITE_PUSHER_APP_FORCE_TLS=true
```

**Note:** These environment variables are accessed in your code using `import.meta.env.VITE_VARIABLE_NAME`. Remember to restart your development server after making changes to the `.env` file.

## Key Modules

- **Pinia**: State management for auth token and user data  
- **Axios**: HTTP client with global auth header  
- **Vue Router**: SPA navigation  
- **Laravel Echo** & **Pusher**: Real-time notifications  

## Usage

1. **Authentication**:  
   - Register or Login to receive JWT  
   - Axios is configured automatically to include the token  

2. **Tasks**:  
   - View tasks by status filters  
   - Create tasks via modal form  
   - Edit tasks via update form  
   - Delete, complete, or cancel tasks  

3. **Real-Time Notifications**:  
   - On new task creation, a Pusher event is received  
   - Notifications are displayed as toasts or in a list  

## Real-Time Setup

The application uses environment variables for Pusher configuration:

```javascript
// Example usage in bootstrap-echo.js
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: import.meta.env.VITE_PUSHER_APP_FORCE_TLS !== 'false'
})
```

## Contributing

Feel free to open issues and pull requests. Ensure code follows project linting and testing standards.

## License

MIT