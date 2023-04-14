
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
    
        let API = '/api/v1/data';
        if (dev)
            API = 'http://localhost:12345'+API;
     
        let data = [];
    
        let result = "";
        let resultStatus = "";
 
        async function getData () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const harvestedData = await res.json();
                result = JSON.stringify(harvestedData,null,2);
                data = harvestedData;
                fillChart(data.map((n)=>(n.v)));
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }

        async function fillChart(serieData){
         
            Highcharts.chart('container', {

                title: {
                    text: 'Random Data',
                    align: 'left'
                },

                subtitle: {
                    text: 'Source: <a href="https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/line-basic" target="_blank">jsfiddle</a>',
                    align: 'left'
                },

                yAxis: {
                    title: {
                        text: 'Random Data'
                    }
                },

                xAxis: {
                    accessibility: {
                        rangeDescription: 'Range: 1 to 5'
                    }
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 1
                    }
                },

                series: [ {
                    name: 'Data serie',
                    data: serieData
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });
        }

    
        onMount(async () => {
            getData();
        });
    
    </script>
    <h1>Graph</h1>
  
    
<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
       Random data
    </p>
</figure>
     
    <button type="button" on:click={getData}>Refresh</button>
    
    
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
    {resultStatus}
    {result}
        </pre>
    {/if}