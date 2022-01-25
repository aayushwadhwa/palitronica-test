ECHO "Building Express Server Image"
docker build -t server ./server

ECHO "Building React Frontend Image"
docker build -t frontend ./frontend

ECHO "Everything done..."
ECHO "Starting Docker Compose"
docker-compose up
