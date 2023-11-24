# Coin API

The Coin API fetches asset data from a remote API and allows querying market data.

## Requirements

- NodeJS (tested on v18)
- Docker and Docker Compose

## Getting started

- (Optional) Install `asdf` to get Node and Docker Compose.

  ```
  brew install asdf
  ```

- Run the database on Docker.

  ```
  docker-compose up -d db
  ```

- Make a copy of `.env.example` and rename to `.env`.

- Deploy Prisma migrations.

  ```
  npx prisma migrate deploy
  ```

- Run the app.

  ```
  docker-compose up
  ```

- Wait for the market data to sync and then execute the following cURL:

  ```
  curl --request GET --url http://localhost:8080/asset/btc
  ```

## Endpoints

### asset/get/{symbol}

Gets market data for an asset by its symbol (i.e. btc, eth, etc.)

| Param    |                           | Description                                     |
| -------- | ------------------------- | ----------------------------------------------- |
| `from`   | `yyyy-mm-dd` - _Optional_ | The start date to filter data.                  |
| `to`     | `yyyy-mm-dd` - _Optional_ | The end date to filter data.                    |
| `limit`  | _Optional_                | The amount of data to return. Defaults to `15`. |
| `offset` | _Optional_                | The start of the data.                          |
