<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { contactStore, contacts } from './contactStore.js';
    onMount(async () => {
      fetch("http://localhost:12345/api/v1/contacts")
      .then(response => response.json())
      .then(data => {
            console.log(data);
            contactStore.set(data);        
      }).catch(error => {
        console.log(error);
        return [];
      });
    });
    </script>
    
<main>
    <h1>Contacts</h1>
    <ul>
    {#each $contacts as contact}
        <li><a ref="/contacts/{contact.name}">{contact.name}</a> : {contact.phone}</li>
    {/each}
    </ul>
</main>


