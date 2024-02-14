# build state
FROM node:16-alpine as builder

# Copy the packeage.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy rest of the project
COPY . .

# Build the project
RUN npm run build



# production stage
FROM nginx:alpine as production-build

# configures the NGINX server
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
# ensure that only your intended content is served by the NGINX server
RUN rm -rf /usr/share/nginx/html/*

# Copy from the build stage
COPY --from=builder /dist /usr/share/nginx/html/forza

# Informs Docker that the container listens on port 8080 at runtime
EXPOSE 2020

# Sets the container to run NGINX in the foreground
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]