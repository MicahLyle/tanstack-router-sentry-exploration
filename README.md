# Tanstack Router Sentry Integration Starting Example

## Background

This is a sample project I used to start on the [initial PR]()
for integrating [Tanstack Router](https://tanstack.com/router/latest) more deeply into [Sentry for React](https://docs.sentry.io/platforms/javascript/guides/react/).

## Installation and Setup

- `touch .env`
- Set `VITE_SENTRY_DSN=your-sentry-dsn` in `.env` to an example or existing Sentry project you'd like to test this with.
- `npm install --include=dev`
- `npm run dev`
- Now visit the server on `localhost:4000`. To get more in-depth examples, manually visit `localhost:4000/posts` and click around. You should be able to see stuff working in the logs.
