<script>
    import { dev } from '$app/environment';    
</script>

<main>
    <h1>About this app</h1>
    This is a contact management<br/>
    <h8>[Runinng in <b>
    {#if dev}
        development
    {:else}
        production
    {/if}</b> mode]</h8>
</main>

<style>
    h8 {
        font-size: .8em;
    }
</style>


