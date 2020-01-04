<script>
  export let data;
</script>

<div class="table">
  <div class="header">
    <span class="title">{data.title}</span>
    {#if data.note}
      <span class="note">{data.note}</span>
    {/if}
  </div>

  {#if data.text}
    <div class="raw-data">{@html data.text}</div>
  {/if}

  {#if data.rows && data.rows.length}
    {#each data.rows as row}
      <div class="row">
        <div class="name">{row.name}</div>
        <div class="value">{@html row.value}</div>
      </div>
      {#if row.description}
      <div class="row description">
        {@html row.description}
      </div>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .table {
    padding: 10px 0;
    border-bottom: 1px solid #cdcdcd;
    margin-bottom: 20px;
  }

  .table .header {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .table .header span, .table .header .note {
    display: inline-block;
    vertical-align: middle;
  }

  .table .header .note {
    font-size: 12px;
    margin-left: 5px;
    padding: 3px 5px;
    background: #ababab;
    border-radius: 3px;
    color: #fff;
  }

  .table .row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .table .row .name, .table .row .value {
    padding: 10px 0;
    overflow-wrap: break-word;
  }

  .table .row .name {
    font-weight: 600;
    min-width: 25%;
  }

  .table .row .value {
    width: 75%;
  }

  .table .row.description {
    color: #787878;
    margin-bottom: 10px;
  }
</style>
