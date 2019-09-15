import App from './App.svelte';
import CuteConfig from './cuteConfig';

async function app() {
	const root = document.getElementById('app');

	const json = await fetch('/insomnia.json', {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());

	const insomniaConfig = new CuteConfig(json).generate();

	return new App({
		target: root,
		props: {
			config: insomniaConfig
		}
	});
}

export default app();
