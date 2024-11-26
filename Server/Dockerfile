FROM node:20.12.0

WORKDIR /Habit Tracker with Streaks Server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]