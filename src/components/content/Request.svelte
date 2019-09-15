<script>
  import applyEnv from '../../lib/applyEnv';

  export let request;
  export let env;

  $: reqData = {
    method: request.method,
    url: applyEnv(request.url, env),
    name: applyEnv(request.name, env),
    description: applyEnv(request.description, env)
  };
</script>

<div class="row">
  <div class="left">
    <h3 class="request-title" id={request._id}><strong class={request.method.toLowerCase()}>{request.method}</strong> {reqData.name}</h3>
    <pre class="url">{reqData.url}</pre>
    
    {#if reqData.description}
      <p>{reqData.description}</p>
    {/if}

    <hr />
  </div>
  <div class="right"></div>
</div>

<style>
  pre.url {
    padding: 8px;
    background: #e9e9e9;
    border: 1px solid #d4d4d4;
    border-radius: 2px;
  }
</style>