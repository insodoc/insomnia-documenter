<script>
  import hljs from '../../lib/highlight';

  import ClipboardJS from 'clipboard';
  import showdown from 'showdown';
  const markdown = new showdown.Converter({
    simplifiedAutoLink: true,
    openLinksInNewWindow: true,
    excludeTrailingPunctuationFromURLs: true,
    tables: true
  });

  import applyEnv from '../../lib/applyEnv';
  import generateCode from '../../lib/generateCode';
  import ContentGenerator from '../../lib/content';

  import Table from './Table.svelte';

  export let request;
  export let env;
  export let language = null;
  export let cookiejars;

  let copyText = 'Copy to clipboard';
  let copyButton;
  let codeElement;

  const content = new ContentGenerator(request);

  $: reqData = {
    method: request.method,
    url: applyEnv(request.url, env),
    name: applyEnv(request.name, env),
    description: applyEnv(request.description, env),
    exampleResponse: applyEnv(request.exampleResponse, env)
  };

  $: exampleCode = generateCode(request, reqData.url, language, cookiejars);

  const code = document.createElement('code');
  $: code.className = language;

  $: code.textContent = exampleCode;
  $: hljs.highlightBlock(code);
  $: exampleHTML = code.outerHTML;

  $: exampleResponse = reqData.exampleResponse && hljs.highlightAuto(reqData.exampleResponse)

  $: clipboard = copyButton && new ClipboardJS(copyButton, {
    target: function () {
      return codeElement;
    }
  });
  $: clipboard && clipboard.on('success', function () {
    copyText = 'Copied!';
    setTimeout(() => copyText = 'Copy to Clipboard', 5000);
  });
  $: clipboard && clipboard.on('error', function (err) {
    console.error(err);
    copyText = 'Failed to copy :(';
    setTimeout(() => copyText = 'Copy to Clipboard', 5000);
  });

  $: description = reqData.description && markdown.makeHtml(reqData.description);
</script>

<div class="row">
  <div class="left">
    <div class="anchor" id={request._id}>&nbsp;</div>
    <h3 class="request-title"><strong class={request.method.toLowerCase()}>{request.method}</strong> {reqData.name}</h3>
    <pre class="url">{reqData.url}</pre>

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
          <a href="javascript:;" bind:this={copyButton}>{copyText}</a>
        </div>
      </div>
      <pre bind:this={codeElement}>{@html exampleHTML}</pre>
    </div>
    {#if reqData.exampleResponse}
    <div class="code-example example-response">
      <div class="header">
        <div class="title">Example response:</div>
      </div>
      <pre>{@html exampleResponse.value}</pre>
    </div>
    {/if}
  </div>
</div>

<style>
  .anchor {
    display: block;
    position: relative;
    top: -60px;
    visibility: hidden;
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

  .code-example .header .title, .code-example .header .copy a {
    padding: 8px 15px;
  }

  .code-example .header .copy a {
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
  }

  .example-response {
    margin-top: 25px;
  }

  .example-response .header {
    background: #675bc0;
  }

  .example-response pre {
    border-color: #675bc0;
  }
</style>
