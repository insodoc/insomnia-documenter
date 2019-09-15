<script>
  export let request;
</script>

<a href="#{request._id}" class="sidebar-list-link name">
  <strong class={request.method.toLowerCase()}>{request.method}</strong>
  <span>{request.name}</span>
</a>
