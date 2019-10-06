<script>
  import Rows from './content/Rows.svelte';

  import applyEnv from '../lib/applyEnv';

  import showdown from 'showdown';
  const markdown = new showdown.Converter({
    simplifiedAutoLink: true,
    openLinksInNewWindow: true,
    excludeTrailingPunctuationFromURLs: true
  });

  import Select from 'svelte-select';

  const languages = [
    { value: 'curl', label: 'cURL' },
    { value: 'javascript', label: 'JavaScript (fetch)' },
    { value: 'python', label: 'Python (requests)' },
    { value: 'node', label: 'Node.js (node-request)' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'golang', label: 'Go' }
  ];

  export let env;
  export let groups;
  export let requests;
  export let workspace;
  export let cookiejars;

  $: content = [ ...groups, ...requests ];
  $: description = workspace.description && markdown.makeHtml(applyEnv(workspace.description, env));

  let selectedValue = languages[0];
  $: language = selectedValue.value;
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
        <Select
          items={languages}
          bind:selectedValue
          isClearable={false}
          isSearchable={false}
        />
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

  .language-selector {
    --background: #555;
    --color: #fff;
    --listBackground: #343434;
    --itemHoverBG: #121212;
    --itemIsActiveBG: #6a57d5;
    --listMaxHeight: auto;
    --border: none;
  }
</style>
