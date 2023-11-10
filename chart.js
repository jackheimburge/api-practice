const xLabels = [];
const yTemps = [];
async function getData() {
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();

    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        const temp = parseFloat(columns[1]);
        xLabels.push(year);
        yTemps.push(temp + 14)
    })
}

async function chart() {
    await getData();
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabels,
            datasets: [{
                label: 'Global Average Temperature (C)',
                fill: true,
                data: yTemps,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, ticks) {
                            return value + '°';
                        }
                    }
                }
            }
        }
    });
}
chart();