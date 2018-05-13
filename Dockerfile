FROM node:8

COPY ./ /app

WORKDIR /app

RUN npm install --unsafe-perm;

RUN npm run build;

CMD ["npm", "start"]
