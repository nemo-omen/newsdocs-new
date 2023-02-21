<script>
  import '../style.css';
</script>

<svelte:head>
  <title>NewsDocs</title>
</svelte:head>

<header>
  <div class="inner header-inner">
    <a href="/" id="brand" aria-label="NewsDocs.org">
      <img src="logo.svg" alt="NewsDocs" width="64" height="64" />
      NewsDocs
    </a>
    <!-- <nav> -->
    <!--   <a href="/">Home</a> -->
    <!--   <a href="/roster">Jail Logs</a> -->
    <!-- </nav> -->
  </div>
</header>

<main>
  <div class="inner">
    <slot />
  </div>
</main>

<footer>
  <div class="inner">
    &copy; {new Date().getFullYear()} NewsDocs
  </div>
</footer>
