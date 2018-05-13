FROM node:8

COPY ./ /app

WORKDIR /app

RUN mkdir /app/data

ENV DATABASE_URL sqlite:////app/data/data.db

RUN npm install --unsafe-perm;

RUN npm run build;

CMD ["npm", "start"]
