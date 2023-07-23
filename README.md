# Stellar API

This is a Node-based API for Stellar, the next generation mirage.

## Quick Start

See the [compose](https://github.com/orphic-inc/stellar-compose) repository for the fastest way to spin up an instance of Stellar.

## Requirements

* Node.js (only LTS version supported)

## Development Environment

    git clone https://github.com/orphic-inc/stellar-api.git api
    cd api
    npm i
    npm start

## Configuration

| Variable              | Description                  | Default   |
|-----------------------|------------------------------|-----------|
| STEL_AUTH_JWT_SECRET  | Secret for signing JWTs      | undefined |
| STEL_LOG_LEVEL        | Winston log level            | info      |
| STEL_LOG_TIME_FMT     | Winston log timestamp format | undefined |
| STEL_HTTP_PORT        | API listening port           | 8080      |
| STEL_HTTP_CORS_ORIGIN | API CORS origin to whitelist | undefined |
