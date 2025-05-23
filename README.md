# **Django & Next.js Webchat**

## **Description**

The Django & Next.js Webchat is a cutting-edge real-time messaging platform that combines the power of Django for backend functionality with Next.js for a dynamic frontend experience. Designed for seamless communication, it offers one-on-one and group chats with WebSocket support, advanced message search, and effortless room sharing.

## **Goal**

Build a modern, scalable real-time web chat application using Django for the backend and Next.js for the frontend.

## **Features**

- **Real-Time Messaging:** One-on-one and group chat functionality with WebSocket support.
- **Search & Filtering:** Search through messages and filter conversations by users.
- **Share chat with others:** Easily copy and share a unique link to invite others into a chat room.
- **Anonymous & Ephemeral Chats:** No user accounts or sign-ins required — all chats are completely anonymous. Messages are not saved or stored permanently, ensuring privacy and no chat history is retained once you leave.

## **Design Elements**

- Clean and responsive UI optimized for desktop and mobile.
- Emphasis on usability and performance with intuitive chat layouts.
- Smooth transitions and feedback using modern UI components.

## **Tech Stack:**

- Frontend: React, Next.js, TypeScript, Tailwind CSS, zustand, shadcnUI
- Backend: Django, DRF, Django Channels
- DevOps: Docker, docker-compose

---

## **Installation**

Clone my project

```cmd
    git clone https://github.com/Fialex1212/django-nextjs-webchat.git
```

### **Frontend**

Run the frontend

```bash
  cd frontend
  cd webchat
  yarn install
  yarn dev
```

### **Backend**

Run the backend

```cmd
  cd backend
  python -m venv venv
  .\venv\scripts\activate
  pip install requirements.txt
  cd base
  python manage.py runserver 0.0.0.0:8000
```

### **Run using Docker**

Run the docker-compose

```bash
  docker-compose up --build
```

Backend by this path - http://127.0.0.1:8000/

Frontend by this path - http://localhost:3000/

## **Screenshots**

![Desktop app Screenshot](./images/og-image.jpg)

## **Authors**

- [@Aleks Seriakov](https://github.com/Fialex1212)
