<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  // console.log(data);
</script>

<div class="roster">
  <div class="roster-header">
    <div class="template-email-container roster-header-container">
      <h3>Email template</h3>
      <form class="email-form" method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
        <button>Send</button>
      </form>
    </div>
    <div class="template-copy-container roster-header-container">
      <h3>Or</h3>
      <button>Copy to Clipboard</button>
    </div>
  </div>
  <h2>Jail Logs: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
  {@html data.templateData}
</div>

<style>
  .email-form {
    display: flex;
    gap: 1rem;
  }
  .roster-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .roster-header-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid var(--fg);
    padding: 1rem;
  }
</style>
