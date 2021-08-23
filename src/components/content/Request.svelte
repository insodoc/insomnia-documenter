<script>
  import hljs from '../../lib/highlight';

  import showdown from 'showdown';
  import ClipboardJS from 'clipboard';
  import formatEnv from '../../lib/formatEnv';
  import ContentGenerator from '../../lib/content';
  import generateCode from '../../lib/generateCode';

  import Table from './Table.svelte';

  const markdown = new showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    openLinksInNewWindow: true,
    excludeTrailingPunctuationFromURLs: true,
  });

  export let request;
  export let language = null;
  export let cookiejars;

  let copyText = 'Copy to clipboard';
  let copyButton;
  let codeElement;

  $: content = new ContentGenerator(request);

  $: reqData = {
    method: request.method,
    url: formatEnv(request.url),
    name: request.name,
    description: request.description,
    exampleResponses: request.exampleResponses,
  };

  $: exampleCode = generateCode(request, request.url, language, cookiejars);

  const code = document.createElement('code');
  $: code.className = language;

  $: code.textContent = exampleCode;
  $: hljs.highlightBlock(code);
  $: exampleHTML = code.outerHTML;

  $: clipboard =
    copyButton &&
    new ClipboardJS(copyButton, {
      target: function () {
        return codeElement;
      },
    });

  $: clipboard &&
    clipboard.on('success', function () {
      copyText = 'Copied!';
      setTimeout(() => (copyText = 'Copy to Clipboard'), 5000);
    });

  $: clipboard &&
    clipboard.on('error', function (err) {
      console.error(err);
      copyText = 'Failed to copy :(';
      setTimeout(() => (copyText = 'Copy to Clipboard'), 5000);
    });

  $: description =
    reqData.description && markdown.makeHtml(reqData.description);

  function getClassForStatusCode(code) {
    if (!code) {
      return 'default';
    }

    switch (code[0]) {
      case '1':
        return 'info';
      case '2':
        return 'success';
      case '3':
        return 'redirect';
      case '4':
        return 'client-error';
      case '5':
        return 'server-error';
      default:
        return 'default';
    }
  }
</script>

<div class="row">
  <div class="left">
    <div class="anchor" id={request._id}>&nbsp;</div>
    <h3 class="request-title">
      <strong class={request.method.toLowerCase()}>{request.method}</strong>
      {reqData.name}
    </h3>
    <pre class="url">{@html reqData.url}</pre>

    {#if description}
      <div class="description">{@html description}</div>
    {/if}

    <div class="tables">
      {#if request.parameters && request.parameters.length}
        <Table data={content.params()} />
      {/if}

      {#if (request.headers && request.headers.length) || (request.authentication && request.authentication.type)}
        <Table data={content.headers()} />
      {/if}

      {#if request.body && (request.body.text || request.body.params)}
        <Table data={content.body()} />
      {/if}
    </div>

    <hr />
  </div>
  <div class="right">
    <div class="code-example">
      <div class="header">
        <div class="title">Example request:</div>
        <div class="copy">
          <span bind:this={copyButton}>{copyText}</span>
        </div>
      </div>
      <pre bind:this={codeElement}>{@html exampleHTML}</pre>
    </div>
    {#if reqData.exampleResponses && reqData.exampleResponses.length}
      {#each reqData.exampleResponses as example}
        {#if example.value}
          <div
            class={'code-example example-response ' +
              getClassForStatusCode(example.code)}
          >
            <div class="header">
              <div class="title">
                Example response{example.code && example.code.length
                  ? ` - ${example.code}`
                  : ''}:
              </div>
            </div>
            <pre>{@html hljs.highlightAuto(example.value).value}</pre>
          </div>
        {/if}
      {/each}
    {/if}
  </div>
</div>

<style>
  .anchor {
    display: block;
    position: relative;
    top: -60px;
    visibility: hidden;
    height: 0;
  }

  pre.url {
    padding: 8px;
    background: #e9e9e9;
    border: 1px solid #d4d4d4;
    border-radius: 2px;
    overflow-x: auto;
  }

  .code-example .header {
    display: flex;
    justify-content: space-between;
    background: #404040;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }

  .code-example .header .title,
  .code-example .header .copy span {
    padding: 8px 15px;
  }

  .code-example .header .copy span {
    cursor: pointer;
    display: inline-block;
    text-decoration: none !important;
    color: #fff;
    background: #333;
  }

  .code-example pre {
    padding: 10px 15px;
    border: 1px solid #404040;
    border-top: 0;
    margin: 0;
    white-space: pre-wrap;
    overflow-x: auto;
  }

  .example-response {
    margin-top: 25px;
  }

  .example-response.default .header {
    background: #675bc0;
  }

  .example-response.default pre {
    border-color: #675bc0;
  }

  .example-response.info .header {
    background: #3949ab;
  }

  .example-response.info pre {
    border-color: #3949ab;
  }

  .example-response.success .header {
    background: #43a047;
  }

  .example-response.success pre {
    border-color: #43a047;
  }

  .example-response.redirect .header {
    background: #6d4c41;
  }

  .example-response.redirect pre {
    border-color: #6d4c41;
  }

  .example-response.client-error .header {
    background: #fb8c00;
  }

  .example-response.client-error pre {
    border-color: #fb8c00;
  }

  .example-response.server-error .header {
    background: #e53935;
  }

  .example-response.server-error pre {
    border-color: #e53935;
  }
</style>
