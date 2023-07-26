FROM node:18 AS build

WORKDIR /app

# 앱의 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드를 컨테이너 안으로 복사
COPY . .
RUN npm run build

FROM node:18 AS production

WORKDIR /app
COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve","-s", "build"]
