<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { dev } from '$app/environment';
    import { ListGroup, ListGroupItem,Button } from 'sveltestrap';

    let API = '/api/v1/contacts';
    if (dev)
        API = 'http://localhost:12345'+API;
    
	let newName = 'petete';
	let newPhone = '11111';
    let contacts = [];

	let result = "";
	let resultStatus = "";
	
	async function insertContact () {
        resultStatus = result = "";
		const res = await fetch(API, {
			method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
			body: JSON.stringify({
				name : newName,
                phone : newPhone
			})
		});
		try{
            const data = await res.json();
            result = JSON.stringify(data,null,2);
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;	
        if(resultStatus == 201)
            getContacts();
	}

	async function getContacts () {
        resultStatus = result = "";
		const res = await fetch(API, {
			method: 'GET'
		});
		try{
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            contacts = data;
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;	
	}

    async function deleteContact (name) {
        resultStatus = result = "";
		const res = await fetch(API+"/"+name, {
			method: 'DELETE'
		});
		try{
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            contacts = data;
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;	
        if(resultStatus == 200)
            getContacts();
	}


    onMount(async () => {
		getContacts();
	});

</script>
<h1> Contacts</h1>
<table>
    <thead>
       <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
       </tr>
    </thead>
    <tbody>
        <tr>
            <td><input bind:value={newName} /></td>
            <td><input bind:value={newPhone} /></td>
            <td><button type="button" on:click={insertContact}>Insert</button></td>
        </tr>
    </tbody>    
</table>

<ListGroup>
    {#each contacts as contact}
    <ListGroupItem>
        <a href="/contacts/{contact.name}">{contact.name}</a> : {contact.phone}  <Button outline secondary on:click={deleteContact(contact.name)}>Delete</Button>
    </ListGroupItem>
    {/each}
</ListGroup>

<button type="button" on:click={getContacts}>Refresh</button>


{#if resultStatus != ""}
    <p>
        Result:
    </p>
    <pre>
{resultStatus}
{result}
    </pre>
{/if}