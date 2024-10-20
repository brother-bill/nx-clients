# nx-clients/apps/tahatime/Dockerfile
FROM node:20.11.1-alpine

WORKDIR /usr/src/app

# Copy workspace configuration files
COPY nx.json package*.json tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy the entire workspace
COPY . .

# Set the working directory to the app
WORKDIR /usr/src/app/apps/tahatime

EXPOSE 4200

# Use nx to serve the app
CMD ["npx", "nx", "serve", "tahatime", "--host", "0.0.0.0"]
