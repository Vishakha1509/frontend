# Growthify Frontend

This is the Next.js frontend for Growthify Services.

## Prerequisites

- Node.js 18+ and npm installed (for manual setup)
- Docker (optional, for containerized setup)

## Manual Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Setup

1.  **Build the Docker image:**
    ```bash
    docker build -t growthify-frontend .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 3000:3000 growthify-frontend
    ```

    Access the application at [http://localhost:3000](http://localhost:3000).
