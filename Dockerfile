# ================
# BUILDER
# ================

FROM node:18.17.0-alpine3.18 AS builder

# Copy sources

WORKDIR /var/www/server
COPY . /var/www/server/

# Install production dependencies to prod_node_modules

RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production

RUN cp -R node_modules prod_node_modules

# Install all dependencies

RUN npm install

# Build app

RUN npm run build

# ================
# DEVELOPMENT
# ================

FROM node:18.17.0-alpine3.18 AS development

# Copy sources

WORKDIR /var/www/server

COPY --from=builder /var/www/server/node_modules /var/www/server/node_modules/
COPY . .

# Expose ports

EXPOSE 8080

# Run the app

CMD ["npm", "run", "start:debug"]

# ================
# PRODUCTION
# ================

FROM node:18.17.0-alpine3.18 AS production

WORKDIR /var/www/server

COPY --from=builder /var/www/server/prod_node_modules /var/www/server/node_modules/
COPY --from=builder /var/www/server/dist /var/www/server/dist/
COPY . .

# Expose ports

EXPOSE 8080

# Run the app

CMD ["npm", "run", "start"]
