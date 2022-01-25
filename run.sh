echo "Building Express Server Image"
docker build -t server ./server

echo "Building React Frontend Image"
docker build -t frontend ./frontend

echo "Everything done..."
echo "Starting Docker Compose"
docker-compose up
