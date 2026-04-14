# Build Stage 1
FROM node:22-alpine AS build
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . ./

# Build the project
RUN npm run build

# Production Stage
FROM node:22-alpine AS production
WORKDIR /app

# Only .output folder is needed from the build stage
COPY --from=build /app/.output ./

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server/index.mjs"]