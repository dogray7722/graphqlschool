FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install --save-dev autoprefixer @tailwindcss/forms postcss tailwindcss tailwindscss

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
