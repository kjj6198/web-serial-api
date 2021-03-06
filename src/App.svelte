<script>
	import { store, requestSerialPort } from './store';
	import Gauge from "./Gauge.svelte";
import { onDestroy } from 'svelte';

	export let serialConnected = false;
	let port 
	$: {
		if (serialConnected) {
			requestSerialPort()
				.then(p => {
					port = p
				})
		}
	}

	onDestroy(() => {
		if (port) {
			port.close()
		}
	})
</script>

<main>
	<h1>Web Serial API with Arduino DHT11</h1>
	<button disabled={serialConnected} on:click={() => serialConnected = true}>Connect USB Device</button>
	{$store.state}
	{#if $store.state === 'active'}
		<Gauge maxValue={45} minValue={-10} label="溫度" unit="C" toFixed={1} value={$store.temperature} fillColor={"#83C9F4"} />
		<Gauge maxValue={100} minValue={0} label="濕度" unit="%" value={$store.humidity} fillColor={"#6F73D2"} />
	{/if}
</main>

<style>
	main {
		max-width: 960px;
		width: 95%;
		margin: 0 auto;
	}
</style>