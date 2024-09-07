
 #  build image from node:22-alpine3.19
FROM node:22-alpine3.19 

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the entire source code to /app/
COPY . /app/

# Expose port (optional)
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]





