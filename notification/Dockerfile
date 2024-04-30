FROM node:18.16.1

# Install FFmpeg
RUN apt-get update

# Set the working directory to /app
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the command to run when the container starts
CMD ["npm", "run", "dev"]
