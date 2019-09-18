<script>
  import Rows from './content/Rows.svelte';

  import applyEnv from '../lib/applyEnv';

  import showdown from 'showdown';
  const markdown = new showdown.Converter({
    simplifiedAutoLink: true,
    openLinksInNewWindow: true,
    excludeTrailingPunctuationFromURLs: true
  });

  export let env;
  export let groups;
  export let requests;
  export let workspace;
  export let cookiejars;

  $: content = [ ...groups, ...requests ];
  $: description = workspace.description && markdown.makeHtml(applyEnv(workspace.description, env));
  
  let language;
</script>

<section class="content">
  <div class="row">
    <div class="left">
      <h1>{workspace.name}</h1>
      {#if description}
        <div class="description">{@html description}</div>
      {/if}
    </div>
    <div class="right">
      <div class="language-selector">
        <span>Language:</span>
        <select bind:value={language}>
          <option value="curl">cURL</option>
          <option value="javascript">JavaScript (fetch)</option>
          <option value="python">Python Requests</option>
          <option value="node">Node.js (node-request)</option>
          <option value="ruby">Ruby</option>
          <option value="php">PHP</option>
          <option value="golang">Go</option>
        </select>
      </div>
    </div>
  </div>
  <Rows content={content} {env} {language} {cookiejars} />
</section>

<style>
  .content {
    margin-left: 260px;
  }

  .language-selector {
    text-align: center;
  }

  .language-selector select {
    background: #555;
    border: none;
    color: #fff;
    width: 80%;
    margin-left: 10px;
  }
</style>
