# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY .env .env

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a smaller image for serving the built React app
FROM nginx:1.19-alpine

# Copy the build output to the default nginx public directory
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy the custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
