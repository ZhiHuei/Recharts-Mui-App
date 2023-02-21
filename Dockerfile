# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine as builder
# Expose port
EXPOSE 80
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
ADD package.json yarn.lock
# ==== BUILD =====
# Install dependencies
RUN yarn install 
# Build the app
RUN yarn build


# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]