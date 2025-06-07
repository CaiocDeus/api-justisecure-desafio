# Use a imagem oficial do Node.js como base
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

# Expõe a porta que o seu aplicativo vai usar
EXPOSE 3010

# Start the server using the dev build
CMD ["npm", "run", "start:dev"]