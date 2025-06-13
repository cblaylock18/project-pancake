# DOCKER BUILD COMMANDS

# Backend
# docker compose up --build backend

# Frontend
# docker compose up --build frontend


FROM node:20

# Set working directory (/app is common naming convention, does not need to match my app)
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the lockfile and package files first so Docker can cache dependencies. 
# Increases build speed if dependencies don't change because they can be taken from cache
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/
COPY packages/shared/package.json packages/shared/

# Install dependencies
RUN pnpm install

# Copy the rest of the application (now that deps are cached)
COPY . .

# Set target app (frontend or backend) to keep each as separate containers
ARG APP_TARGET
ENV APP_TARGET=$APP_TARGET

# Generate Prisma client if building the backend
RUN if [ "$APP_TARGET" = "backend" ]; then \
      pnpm --filter backend prisma generate ; \
    fi

# Build frontend or backend depending on target
RUN if [ "$APP_TARGET" = "frontend" ]; then \
      pnpm --filter frontend build ; \
    elif [ "$APP_TARGET" = "backend" ]; then \
      pnpm --filter backend build ; \
    fi

# Set working directory to the correct app
WORKDIR /app/apps/$APP_TARGET

# Start the app
CMD ["pnpm", "start"]
