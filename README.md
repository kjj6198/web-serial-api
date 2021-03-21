![web serial api](https://dnf7fm7877tpg.cloudfront.net/images/svvrERHay1dRsqnS563US6.jpg)

## Web Serial API with Arduino

* Send DHT11 temperature data to serial port
* display UI

It won't run correctly if the data sent from serial port is not JSON format. Please read [arduino.ino](./src/arduino.ino) for more details.

## Web Serial API

- [Serial API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Serial)
- [Getting Started with the Web Serial API](https://codelabs.developers.google.com/codelabs/web-serial#0)

## Introduction

- [store.js](./src/store.js): request and read serial port data with svelte store
- [Gauge.svelte](./src/Gauge.svelte): A simple svelte component to display sensor data

[CodeSandbox](https://codesandbox.io/s/simple-gauge-j4371)
