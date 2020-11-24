<svelte:head>
  <title>Uh-oh!</title>
</svelte:head>

<div class="error-page">
  <h1>Uh-oh!</h1>
  <p>
    It looks like it's not possible to retrieve the contents of the API documentation
    at the moment. If you're the owner of this site, make sure that your
    <a href={window.INSOMNIA_URL} target="_blank">Insomnia JSON file</a> is accessible.
  </p>
  <p>
    The developer console of your browser might have more things to say about this error.
  </p>
</div>

<style>
  .error-page {
    width: 760px;
    margin: 60px auto 0;
  }

  @media only screen and ( max-width: 760px ) {
    .error-page {
      width: auto;
      padding: 15px;
    }
  }
</style>
