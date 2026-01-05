Bump'n:

Created with a React frontend, Express middleware, and Node.js Backend

## Docker

This repository includes Docker configurations for both the frontend and backend.

Frontend (production build served by nginx):

- Dockerfile: `Dockerfile.frontend`

Build the frontend image and run:

```powershell
# build the image (from project root)
docker build -f Dockerfile.frontend -t jamming-frontend:latest .

# run the container, mapping port 80
docker run --rm -p 3000:80 jamming-frontend:latest
```

Then open http://localhost:3000 to view the frontend.

Backend (Express server):

- Dockerfile: `server/Dockerfile`

Build and run the backend image:

```powershell
# build backend image
docker build -f server/Dockerfile -t jamming-backend:latest ./server

# run backend mapping port 3001
docker run --rm -p 3001:3001 --env REACT_APP_SPOTIFY_CLIENT_ID="<SpotifyClient-id>" --env REACT_APP_SPOTIFY_CLIENT_SECRET="<SpotifyClient-secret>" jamming-backend:latest
```

Notes:

- The backend reads `PORT` from the environment (default 3001). The server now binds to 0.0.0.0 so the container can accept external connections.
- Replace the environment variables with your actual Spotify client id/secret when running the server image.

Docker Compose
---------------

You can start both services together using Docker Compose. Copy `.env.example` to `.env` and fill in your Spotify credentials, then run:

```powershell
# Build and start frontend + backend
docker compose up --build

# Or to run in detached mode
docker compose up --build -d
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:3001. The compose file sets the frontend's `REACT_APP_API_BASE_URL` to `http://backend:3001` so the frontend talks to the backend service directly in the Docker network (for local dev with compose).
