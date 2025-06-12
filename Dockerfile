FROM node:20
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install

ARG APP_TARGET
ENV APP_TARGET=$APP_TARGET

RUN if [ "$APP_TARGET" = "backend" ]; then \
      pnpm --filter backend prisma generate ; \
    fi

RUN if [ "$APP_TARGET" = "frontend" ]; then \
      pnpm --filter frontend build ; \
    elif [ "$APP_TARGET" = "backend" ]; then \
      pnpm --filter backend build ; \
    fi

RUN echo "APP_TARGET is: $APP_TARGET"

WORKDIR /app/apps/$APP_TARGET
CMD ["pnpm", "start"]
