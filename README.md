# Install

Prerequisities:

-   Node 12
-   Yarn 1.22

To install the project, run the following:

```
yarn
```

# How to run

Due to how CRA is configured, we need to build and run the project locally to get ServiceWorkers up and running.

```
yarn start
```

In a pinch if this does not work, then the following will run but without SW support:

```
yarn start:dev
```

Open [http://localhost:5000](http://localhost:5000) in a browser.
