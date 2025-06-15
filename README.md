# 🐳 Docker + Prisma Dev Workflow

## 📦 Build & Push Docker Images (Backend)

### Build and push an updated backend image to Docker Hub

```bash
docker build -t cblaylock18/project-pancake-backend --build-arg APP_TARGET=backend .
docker push cblaylock18/project-pancake-backend
```

-   Uses the monorepo root `Dockerfile`
-   Builds only the backend using `APP_TARGET`

---

## 🧪 Test Docker Compose Locally

### Start the full dev stack

```bash
docker compose up --build
```

-   Automatically builds backend and frontend as needed
-   Backend runs:
    -   `prisma migrate deploy`
    -   `prisma db seed`
    -   `pnpm start`

> Make sure your `.env` file is present or environment variables are set

---

## 👯‍♂️ Frontend Dev Instructions

### Pull and run the latest backend image

-   make sure you have the latest .env file

```bash
docker compose pull backend
docker compose up
```

-   Uses the pre-built Docker Hub image
-   Also starts the local PostgreSQL and frontend containers

---

## 🔁 Prisma Sync on Railway (Remote Deployments)

-   On Railway, the `ENVIRONMENT_NAME=development` variable triggers the same Prisma setup:
    -   `prisma migrate deploy`
    -   `prisma db seed`

✅ This ensures your remote dev DB is reseeded on each deploy.

---

## 🧹 Helpful Commands

### Clean all Docker images, containers, and cache

```bash
docker system prune -a
```

### Free a port manually (like 5432)

```bash
sudo lsof -i :5432
sudo kill <PID>
```

---

## ✅ Notes & Gotchas

-   Prisma seed script uses `skipDuplicates: true` so it won’t overwrite data
-   Prisma generate is handled in Dockerfile:

```dockerfile
RUN if [ "$APP_TARGET" = "backend" ]; then \
  pnpm --filter backend generate ; \
fi
```

-   To run PostgreSQL locally (outside Docker):

```bash
sudo systemctl restart postgresql
psql -U <your-username>
```

-   Railway deployment logs might show errors if `generate`, `migrate`, or `seed` are missing or misconfigured — be sure to include them in `package.json`:

```json
"scripts": {
  "generate": "prisma generate",
  "migrate": "prisma migrate deploy",
  "seed": "prisma db seed"
}
```

-   Make sure to build types with the `pnpm build` command before deploying to ensure type safety and consistency in packages/shared
