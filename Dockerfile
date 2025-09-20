FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy React build
COPY --from=builder /app/dist .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# IMPORTANT: use 8080 (Elastic Beanstalk default)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
