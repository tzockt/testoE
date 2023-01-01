FROM node:latest

ENV NODE_ENV=production

WORKDIR /bot

COPY . .

RUN npm install --production

CMD ["node", "main.js"]