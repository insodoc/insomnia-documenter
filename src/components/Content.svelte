<script>
  import Rows from './content/Rows.svelte';

  export let env;
  export let groups;
  export let requests;
  export let workspace;

  $: content = [ ...groups, ...requests ];
</script>

<section class="content">
  <div class="row">
    <div class="left">
      <h1>{workspace.name}</h1>
    </div>
    <div class="right">
      <div class="language-selector">
        <span>Language:</span>
        <select>
          <option name="curl">cURL</option>
          <option name="javascript">JavaScript (fetch)</option>
          <option name="python">Python Requests</option>
          <option name="node">Node.js (node-request)</option>
          <option name="ruby">Ruby</option>
          <option name="php">PHP</option>
          <option name="golang">Go</option>
        </select>
      </div>
    </div>
  </div>
  <Rows content={content} {env} />
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
