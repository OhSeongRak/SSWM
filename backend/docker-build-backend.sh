if docker ps -a | grep sswm-springboot-container; then docker rm -f sswm-springboot-container; fi
if docker ps -a | grep app-server_application:latest; then docker rmi -f app-server_application:latest; fi
cd app-server
sudo docker-compose up -d
