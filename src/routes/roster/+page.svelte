<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let isCopied = false;
  let isCodeView = false;
  let isPostFormOpen = false;
  let error: string;

  async function copy() {
    try {
      await navigator.clipboard.writeText(data.templateData);
    } catch (error) {
      isCopied = false;
    } finally {
      toggleCopied();
      // const copiedText = await navigator.clipboard.readText();
      // console.log(copiedText);
      // if (copiedText === data.templateData) {
      //   toggleCopied();
      // }
    }
  }

  function toggleCopied() {
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 3000);
  }

  function toggleCode() {
    isCodeView = !isCodeView;
  }

  function togglePostForm() {
    isPostFormOpen = !isPostFormOpen;
  }

  // console.log(data);
</script>

<div class="roster">
  <div class="roster-header">
    {#if !isCopied}
      <button on:click={copy}>Copy the Code</button>
    {:else}
      <button>Code Copied!</button>
    {/if}

    {#if !isCodeView}
      <button on:click={toggleCode}>See the Code</button>
    {:else}
      <button on:click={toggleCode}>See the Post</button>
    {/if}

    <button on:click={togglePostForm}>Create Post</button>
  </div>
  <dialog open={isPostFormOpen}>
    <form method="POST">
      <div class="form-body">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <input type="submit" value="Send It!" />
        <button>Cancel</button>
      </div>
    </form>
  </dialog>
  {#if !isCodeView}
    <h2>Jail Logs: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
    {@html data.templateData}
  {:else}
    {@html data.codeData}
  {/if}
</div>

<style>
  .roster-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    justify-content: flex-end;
  }

  .roster-header-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid var(--fg);
    padding: 1rem;
  }

  .form-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: right;
    gap: 1rem;
  }

  .post-form form input[type='button'],
  .post-form form input[type='submit'] {
    /* width: 20rem; */
    align-self: flex-end;
  }
</style>
