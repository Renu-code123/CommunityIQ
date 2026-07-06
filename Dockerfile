# Stage 1: Build the React/Vite app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (layer cache optimization)
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the optimized production bundle
RUN npm run build

# ─────────────────────────────────────
# Stage 2: Serve with lightweight Nginx
# ─────────────────────────────────────
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config (handles React SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run requires the container to listen on port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
