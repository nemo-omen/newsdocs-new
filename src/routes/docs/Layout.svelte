<script>
  import TOC from './toc.ts';

</script>

<div class="docs">
  <aside>
  <ul>
    {#each TOC as parent}
    <li>
      <a href="{parent.url}">{parent.title}</a>
      {#if parent.children}
        <ul class="children">
        {#each parent.children as child}
            <li>
              <a href="{child.url}">{child.title}</a>
            </li>
        {/each}
        </ul>
      {/if}
    </li>
    {/each}
  </ul>
  </aside>

  <article class="post">
  <slot />
  </article>
</div>

<style>
.docs {
  display: grid;
  grid-template-columns: 20ch 1fr;
  gap: 2rem;
}

aside {
  padding-top: 1rem;
  max-width: 30ch;
  min-width: 20ch;
}

aside ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul.children {
  padding-left: 1rem;
  margin-bottom: 0.5rem;
}
</style>
