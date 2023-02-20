# FROM node:14-alpine AS builder
# WORKDIR /app
# COPY /*.json ./
# COPY . .
# RUN npm run build

# FROM node:14-alpine
# WORKDIR /app
# COPY --from=builder /app ./
# EXPOSE ${API_PORT}
# CMD ["npm", "run", "start:prod"]
# Use Node.js v14.x as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the source code to the container
COPY . .

# Expose the API port
EXPOSE 3000

# Start the application
CMD ["npm", "build"]
