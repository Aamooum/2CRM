# Task Manager API (Backend)

<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">
  </a>
</p>

## Overview

This repository contains the **Laravel** backend for a Task Manager application. It provides:

- JWT-based authentication  
- CRUD API endpoints for tasks  
- Real-time task creation notifications via **Laravel Echo** & **Pusher**  
- Database notifications for persistence  

## Features

- **Authentication** using `tymon/jwt-auth`  
- **Task Management**: Create, read, update, delete tasks  
- **Real-time Notifications**: Broadcast `TaskCreated` events to users  
- **Database Notifications**: Store notifications in `notifications` table  

## Requirements

- PHP 8.0+  
- Composer  
- MySQL or PostgreSQL  
- Redis (for queues and broadcasting)  
- Pusher account (app ID, key, secret, cluster)  

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/your-org/task-manager-backend.git
cd task-manager-backend
```

2. Install PHP dependencies:  
```bash
composer install
```

3. Install JS dependencies:  
```bash
npm install
```

4. Copy env file and configure:  
```bash
cp .env.example .env
```

Update `.env` with your database, JWT, and Pusher credentials:
```env
APP_URL=http://localhost
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tasks
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=your_generated_jwt_secret

BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your_pusher_id
PUSHER_APP_KEY=your_pusher_key
PUSHER_APP_SECRET=your_pusher_secret
PUSHER_APP_CLUSTER=your_pusher_cluster

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

5. Generate application and JWT keys:  
```bash
php artisan key:generate
php artisan jwt:secret
```

6. Run database migrations and seeders:  
```bash
php artisan migrate --seed
```

7. Build frontend assets (optional):  
```bash
npm run dev
```

8. Start the development server:  
```bash
php artisan serve
```

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user  
- `POST /api/auth/login` — Login and receive JWT token  
- Protect routes using `auth:api` middleware with `Authorization: Bearer {token}` header  

### Tasks

- `GET /api/tasks` — List all tasks for authenticated user  
- `GET /api/tasks/{id}` — Get a single task  
- `POST /api/tasks` — Create a new task  
- `PUT /api/tasks/{id}` — Update an existing task  
- `DELETE /api/tasks/{id}` — Delete a task  

## Real-Time Notifications

### Laravel Setup

1. Configure `config/broadcasting.php` to use Pusher.  
2. Create `TaskCreated` event implementing `ShouldBroadcast`:  
```php
class TaskCreated implements ShouldBroadcast {
    use Dispatchable, SerializesModels;
    public $task;
    public function __construct(Task $task) { $this->task = $task; }
    public function broadcastOn() {
        return new PrivateChannel('App.Models.User.' . $task->user_id);
    }
}
```
3. Dispatch event after task creation in controller:  
```php
$task = Task::create($data);
broadcast(new TaskCreated($task));
```

### Frontend Setup

1. Install Echo and Pusher:  
```bash
npm install laravel-echo pusher-js
```
2. Initialize Echo (e.g., in `resources/js/bootstrap-echo.js`):  
```javascript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
});
```
3. Listen for `TaskCreated` in your JS:  
```javascript
Echo.private(`App.Models.User.${userId}`)
    .listen('TaskCreated', e => {
        console.log('New task created:', e.task);
        // Show notification in UI
    });
```

## Testing

Run application tests:  
```bash
php artisan test
```

## License

This project is licensed under the **MIT** License.