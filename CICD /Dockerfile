# Build client
FROM node:16 AS client-build
WORKDIR /app
COPY pactify-app/package*.json ./
RUN npm install
COPY pactify-app/ ./
RUN npm run build

# Build server
FROM node:16 AS server-build
WORKDIR /app
COPY pactify-server/package*.json ./
RUN npm install
COPY pactify-server/ ./

# Copy the client build to the server's public directory
COPY --from=client-build /app/build /app/public

# MaKing Sure the entire project is copied
COPY pactify-server/models /app/models
COPY pactify-server/routes /app/routes


EXPOSE 5000


CMD ["node", "server.js"]