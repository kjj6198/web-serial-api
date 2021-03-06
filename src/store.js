import { get, writable } from 'svelte/store';

export const store = writable({
  temperature: 0,
  humidity: 0,
  state: 'initial', // initial | active | terminated
  timer: null,
});

export const requestSerialPort = async () => {
  const serial = navigator.serial;
  const port = await serial.requestPort();
  await port.open({ baudRate: 9600 });
  let decoder = new TextDecoderStream();
  port.readable.pipeTo(decoder.writable);
  const reader = decoder.readable.getReader();

  try {
    let buffer = '';
    store.update((value) => ({
      ...value,
      state: 'active',
    }));
    const timerId = setInterval(async () => {
      const { value, done } = await reader.read();
      buffer += value;
      if (buffer.includes('{') && buffer.includes('}')) {
        const start = buffer.indexOf('{');
        const end = buffer.indexOf('}');
        buffer = buffer.slice(start, end + 1);
        try {
          const { temperature, humidity } = JSON.parse(buffer);
          store.update((value) => ({
            ...value,
            temperature,
            humidity,
          }));
        } catch (err) {
          console.log(err);
        }
        buffer = '';
      }
    }, 1500);
    store.update((value) => ({
      ...value,
      timerId: timerId,
    }));
  } catch (err) {
    console.log(err);
  }

  return port;
};
