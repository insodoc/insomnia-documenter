<script>
  import Sidebar from './components/Sidebar.svelte';
  import Content from './components/Content.svelte';

  export let config;

  let envId = 0;
  $: env = config.environments[envId];
</script>

<svelte:head>
  <title>{config.workspace.name}</title>
</svelte:head>

<header>
  <h1 class="title">{config.workspace.name}</h1>
  <div class="environment">
    <span>Environment:</span>
    <select bind:value={envId}>
      {#each config.environments as environment, idx}
        <option value={idx}>{environment.name}</option>
      {/each}
    </select>
  </div>
</header>

<section class="wrapper">
  <Sidebar config={config} />
  <Content
    requests={config.requests}
    groups={config.groups}
    workspace={config.workspace}
    cookiejars={config.cookiejars}
    {env}
  />
</section>

<style type="scss" global>
  @import './styles/main';

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 15px 30px;
    border-bottom: 1px solid #dedede;
    background: #fff;
    z-index: 10000;
    display: flex;
    justify-content: space-between;
  }

  header .title {
    padding: 0;
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }

  header .environment {
    font-size: 13px;
  }

  header .environment select {
  margin-bottom: 0;
  }

  .wrapper {
    margin-top: 60px;
  }
</style>
