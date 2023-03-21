<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let API = '/api/v1/contacts/'+$page.params.name;

    

    if (dev)
        API = 'http://localhost:12345'+API;
    
    let contact = {};

	let result = "";
	let resultStatus = "";
	

	async function getContact () {
        resultStatus = result = "";
		const res = await fetch(API, {
			method: 'GET'
		});
		try{
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            contact = data;
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;	
	}

    async function goHome () {
        goto('/');
	}

    onMount(async () => {
        console.log(JSON.stringify($page,null,2));
		getContact();
	});

</script>

{#if resultStatus == "200"}
    {contact.name} : {contact.phone}
{/if}

{#if resultStatus == "404"}
    Contact with name '{$page.params.name}' not found;
{/if}

{#if resultStatus != ""}
    <p>
        Result:
    </p>
    <pre>
{resultStatus}
{result}
    </pre>
{/if}

<button type="button" on:click={goHome}>
	Home
</button>