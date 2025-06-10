# Use official Node image
FROM node:20

# Set working directory to monorepo root
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the monorepo files including the lockfile and workspace config
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy the whole monorepo (so shared packages + apps are available)
COPY apps ./apps
COPY packages ./packages

# Set working directory to backend app
WORKDIR /app/apps/backend

# Install only backend deps (pnpm understands the workspace layout)
RUN pnpm install --filter ./...

# Build the backend TypeScript code
RUN pnpm build

# Run the backend
CMD ["node", "dist/index.js"]
