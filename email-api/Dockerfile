FROM node:23-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm i

COPY . .

EXPOSE 8080

CMD ["pnpm", "dev", "--port", "8080"]