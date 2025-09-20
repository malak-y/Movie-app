# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install ALL deps (including devDependencies for build)
# Force install devDependencies by unsetting NODE_ENV
RUN npm install --include=dev

# Copy the rest of the app
COPY . .

# Run the build (requires tsc + vite from devDependencies)
RUN npm run build


# ---------- Production stage ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy React build from builder stage
COPY --from=builder /app/dist .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Elastic Beanstalk Docker platform expects port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
