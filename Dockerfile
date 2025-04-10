FROM node:23-alpine

ENV NODE_ENV=production

WORKDIR /bot

COPY . .

RUN npm install --production
RUN npm cache clean --force

CMD ["node", "main.js"]