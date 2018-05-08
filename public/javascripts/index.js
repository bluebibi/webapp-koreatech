$(document).ready(function () {
    var timeData = [], torqueData = [], displacementData = [], velocityData = [], accelerationData = [];

    var torqueChartData = {
        labels: timeData,
        datasets: [
            {
                fill: false,
                label: 'torque',
                borderColor: "rgba(255, 204, 0, 1)",
                pointBoarderColor: "rgba(255, 204, 0, 1)",
                backgroundColor: "rgba(255, 204, 0, 0.4)",
                pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
                pointHoverBorderColor: "rgba(255, 204, 0, 1)",
                data: torqueData
            }
        ]
    };

    var displacementChartData = {
        labels: timeData,
        datasets: [
            {
                fill: false,
                label: 'displacement',
                borderColor: "rgba(24, 120, 240, 1)",
                pointBoarderColor: "rgba(24, 120, 240, 1)",
                backgroundColor: "rgba(24, 120, 240, 0.4)",
                pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
                pointHoverBorderColor: "rgba(24, 120, 240, 1)",
                data: displacementData
            }
        ]
    };

    var velocityChartData = {
        labels: timeData,
        datasets: [
            {
                fill: false,
                label: 'velocity',
                borderColor: "rgba(255, 204, 0, 1)",
                pointBoarderColor: "rgba(255, 204, 0, 1)",
                backgroundColor: "rgba(255, 204, 0, 0.4)",
                pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
                pointHoverBorderColor: "rgba(255, 204, 0, 1)",
                data: velocityData
            }
        ]
    }

    var accelerationChartData = {
        labels: timeData,
        datasets: [
            {
                fill: false,
                label: 'acceleration',
                borderColor: "rgba(24, 120, 240, 1)",
                pointBoarderColor: "rgba(24, 120, 240, 1)",
                backgroundColor: "rgba(24, 120, 240, 0.4)",
                pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
                pointHoverBorderColor: "rgba(24, 120, 240, 1)",
                data: accelerationData
            }
        ]
    }

    var torqueChartOption = {
        title: {
            display: true,
            text: 'Torque',
            fontSize: 20
        },
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Torque (N*m)',
                    display: true
                }
            }],
            xAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Time (ms.)',
                    display: true
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                }
            }]
        },
        legend: {
            display: false,
        }
    }

    var displacementChartOption = {
        title: {
            display: true,
            text: 'Displacement',
            fontSize: 20
        },
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Displacement (m)',
                    display: true
                }
            }],
            xAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Time (ms.)',
                    display: true
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                }
            }]
        },
        legend: {
            display: false,
        }
    }

    var velocityChartOption = {
        title: {
            display: true,
            text: 'Velocity',
            fontSize: 20
        },
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Velocity (m/s)',
                    display: true
                }
            }],
            xAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Time (ms.)',
                    display: true
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                }
            }]
        },
        legend: {
            display: false,
        }
    }

    var accelerationChartOption = {
        title: {
            display: true,
            text: 'Acceleration',
            fontSize: 20
        },
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Acceleration (m/s^2)',
                    display: true
                }
            }],
            xAxes: [{
                display: true,
                scaleLabel: {
                    labelString: 'Time (ms.)',
                    display: true
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                }
            }]
        },
        legend: {
            display: false,
        }
    }

    //Get the context of the canvas element we want to select
    var torqueCtx       = document.getElementById("torque").getContext("2d");
    var displacementCtx = document.getElementById("displacement").getContext("2d");
    var velocityCtx     = document.getElementById("velocity").getContext("2d");
    var accelerationCtx = document.getElementById("acceleration").getContext("2d");

    //var optionsNoAnimation = { animation: false }

    var torqueChart = new Chart(torqueCtx, {
        type: 'line',
        data: torqueChartData,
        options: torqueChartOption
    });

    var displacementChart = new Chart(displacementCtx, {
        type: 'line',
        data: displacementChartData,
        options: displacementChartOption
    });

    var velocityChart = new Chart(velocityCtx, {
        type: 'line',
        data: velocityChartData,
        options: velocityChartOption
    });

    var accelerationChart = new Chart(accelerationCtx, {
        type: 'line',
        data: accelerationChartData,
        options: accelerationChartOption
    });

    var ws = new WebSocket('wss://' + location.host);

    ws.onopen = function () {
      console.log('Successfully connect WebSocket~~~~');
    }

    j = 0;
    ws.onmessage = function (message) {
        //console.log('receive message' + message.data);
        try {
            var obj = JSON.parse(message.data);

            if (!obj.torque || !obj.displacement || !obj.velocity || !obj.acceleration) {
                console.log('Error 1');
                return;
            }

            torqueData.length = 0;
            displacementData.length = 0;
            velocityData.length = 0;
            accelerationData.length = 0;
            timeData.length = 0;

            torqueData.push.apply(torqueData, obj.torque);
            displacementData.push.apply(displacementData, obj.displacement);
            velocityData.push.apply(velocityData, obj.velocity);
            accelerationData.push.apply(accelerationData, obj.acceleration);

            for (var i = 0; i < 2000; i++) {
              timeData.push(i + (j * 2000));
            }
            j++;

            // const maxLen = 2000;
            // var len = torqueData.length;
            // if (len > maxLen) {
            //     torqueData.shift();
            //     displacementData.shift();
            //     velocityData.shift();
            //     accelerationData.shift();
            //     timeData.shift();
            // }

            torqueChart.update();
            displacementChart.update();
            velocityChart.update();
            accelerationChart.update();

            console.log("Updated!!!");
        } catch (err) {
            console.error(err);
        }
    }
});
