<script>
    // @ts-nocheck
	let name = 'petete';
	let phone = '11111';
	let result = "";
	let resultStatus = "";
	
	async function doPost () {
        resultStatus = result = "";
		const res = await fetch('http://localhost:12345/api/v1/contacts', {
			method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
			body: JSON.stringify({
				name,
                phone
			})
		});
		try{
            const json = await res.json();
            result = JSON.stringify(json);
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;	
	}
</script>


<input bind:value={name} />
<input bind:value={phone} />
<button type="button" on:click={doPost}>
	New Contact
</button>

{#if resultStatus != ""}
    <p>
        Result:
    </p>
    <pre>
    {resultStatus} 
    {result}
    </pre>
{/if}