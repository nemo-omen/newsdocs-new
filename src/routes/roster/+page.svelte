<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{@html data.roster.current}

{@html data.roster.released}
