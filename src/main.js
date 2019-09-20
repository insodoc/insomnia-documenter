import App from './App.svelte';
import ErrorPage from './ErrorPage.svelte';
import CuteConfig from './lib/cuteConfig';

async function app() {
  const root = document.getElementById('app');
  const rootPath = root.getAttribute('data-root') || '';

  const url = process.env.NODE_ENV === 'demo'
    ? '/insomnia-documenter/insomnia.json'
    : `${rootPath}/insomnia.json`;

  window.INSOMNIA_URL = url;

  try {
    // eslint-disable-next-line no-undef
    const json = await fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
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
  } catch (err) {
    console.error(err);

    return new ErrorPage({
      target: root
    });
  }
}

export default app();
