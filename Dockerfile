FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    g++ \
    make \
    python3 \
    && rm -rf /var/lib/apt/lists/* \
    && npm install

COPY . .

RUN npx prisma generate

RUN npm run build

ENV JWT_SECRET="alvaro-back-end"

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
