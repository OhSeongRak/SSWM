docker rm -f sswm-springboot-container
docker rmi -f ubuntu_application:latest
cd app-server
sudo docker-compose up -d
