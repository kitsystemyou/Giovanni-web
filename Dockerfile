FROM node:16-bookworm as builder

COPY package.json yarn.lock ./
RUN yarn --prod --frozen-lockfile

COPY . .
RUN yarn build


FROM gcr.io/distroless/nodejs:16
ENV NODE_ENV production
WORKDIR /app

COPY --from=builder ./public ./public
COPY --from=builder ./.next ./.next
COPY --from=builder ./node_modules ./node_modules

CMD ["./node_modules/.bin/next", "start"]