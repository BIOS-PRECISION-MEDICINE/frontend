### STAGE 1:BUILD ###
# Defining a node image to be used
FROM node:18 AS node
# Create a Virtual directory inside the docker image
WORKDIR /usr/local/app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY ./ /usr/local/app/
# 
RUN npm install

RUN npm run build

### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder

COPY --from=node /usr/local/app/dist/frontend-main /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container 
# the app will be using Port 8080 while running
EXPOSE 8080
