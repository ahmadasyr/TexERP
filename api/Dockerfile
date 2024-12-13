FROM node:22
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install prisma@latest
RUN npx prisma migrate dev --name init
EXPOSE 4000
CMD ["npm", "run", "dev"]
