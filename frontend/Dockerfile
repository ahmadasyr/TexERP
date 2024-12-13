# Stage 1: Install dependencies and build the application
FROM node:22 AS builder

# Set working directory
WORKDIR /frontend

# Copy dependency files
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:16-alpine

# Set working directory
WORKDIR /frontend

# Copy build output and production dependencies from the builder stage
COPY --from=builder /frontend/package.json /frontend/package-lock.json ./
COPY --from=builder /frontend/.next /frontend/.next
COPY --from=builder /frontend/public /frontend/public
COPY --from=builder /frontend/node_modules /frontend/node_modules
COPY --from=builder /frontend/next.config.mjs ./

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
