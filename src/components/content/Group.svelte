<script>
  import applyEnv from '../../lib/applyEnv';

  import showdown from 'showdown';

  const markdown = new showdown.Converter({
    simplifiedAutoLink: true,
    openLinksInNewWindow: true,
    excludeTrailingPunctuationFromURLs: true,
    tables: true,
  });

  export let group;
  export let env;

  $: groupData = {
    name: applyEnv(group.name, env),
    description: applyEnv(group.description, env),
  };

  // The Insomnia JSON file seems to have a description field here, but I couldn't find
  // any way to change the description of the groups in Insomnia itself.
  // The declaration will stay here anyway in case there will be better support for
  // this added later on in Insomnia.
  $: description =
    groupData.description && markdown.makeHtml(groupData.description);
</script>

<div class="row">
  <div class="left">
    <h2>{groupData.name}</h2>

    {#if description}
      <div class="description">{@html description}</div>
    {/if}

    <hr />
  </div>
  <div class="right" />
</div>
