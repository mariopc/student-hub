FROM node:23-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm i

COPY . .

RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "serve", "-s", "dist", "-l", "8080"]
#CMD ["pnpm", "dev", "--port", "8080"]