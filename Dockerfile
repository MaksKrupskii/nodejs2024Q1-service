FROM node:20
WORKDIR /usr/app
COPY package*.json ./
RUN npm i --force && npm cache clean --force
COPY . .
RUN npx prisma generate
EXPOSE ${PORT}
# CMD [ "npm", "run", "start:dev"]