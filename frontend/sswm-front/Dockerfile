# # Node.js를 사용하여 React 앱을 빌드합니다.
# FROM node:18 AS build
# WORKDIR /app
# # 앱의 종속성 설치
# COPY package*.json ./
# RUN npm install
# # 소스 코드를 컨테이너 안으로 복사합니다.
# COPY . .
# RUN npm run build
# FROM node:18 AS production
# WORKDIR /app
# COPY --from=build /app/build ./build
# RUN npm install -g serve
# EXPOSE 3000
# ENTRYPOINT ["serve","-s", "build"]

FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY build/ ./build
RUN npm install -g serve
EXPOSE 3000
ENTRYPOINT ["serve","-s", "build"]
