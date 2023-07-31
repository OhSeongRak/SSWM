# Path where Dockerfile exists
docker build -t react-app-image .
docker rm -f sswm-front-container
docker run --name sswm-front-container -d -p 3000:3000 sswm-front-image
react-app-image
