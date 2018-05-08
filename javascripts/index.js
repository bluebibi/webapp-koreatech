$(document).ready(function () {
    var timeData = [], torqueData = [], displacementData = [], velocityData = [], accelerationData = [];

    var torqueChartData = {
        labels: timeData,
        datasets: [
            {
                fill: false,
                label: 'torque',
                yAxisID: 'torque',
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
                yAxisID: 'displacement',
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
                yAxisID: 'velocity',
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
              yAxisID: 'acceleration',
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
                id: 'torque',
                type: 'linear',
                scaleLabel: {
                    labelString: 'Torque (N*m)',
                    display: true
                },
                position: 'left',
            }]
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
                id: 'displacement',
                type: 'linear',
                scaleLabel: {
                    labelString: 'Displacement (m)',
                    display: true
                },
                position: 'left',
            }]
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
                id: 'velocity',
                type: 'linear',
                scaleLabel: {
                    labelString: 'Velocity (m/s)',
                    display: true
                },
                position: 'left',
            }]
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
                id: 'acceleration',
                type: 'linear',
                scaleLabel: {
                    labelString: 'Acceleration (m/s^2)',
                    display: true
                },
                position: 'left',
            }]
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
        data: torqueData,
        options: torqueChartOption
    });

    var displacementChart = new Chart(displacementCtx, {
        type: 'line',
        data: displacementData,
        options: displacementChartOption
    });

    var velocityChart = new Chart(velocityCtx, {
        type: 'line',
        data: velocityData,
        options: velocityChartOption
    });

    var accelerationChart = new Chart(accelerationCtx, {
        type: 'line',
        data: accelerationData,
        options: accelerationChartOption
    });

    var ws = new WebSocket('wss://' + location.host);

    ws.onopen = function () {
      console.log('Successfully connect WebSocket~');
    }

    ws.onmessage = function (message) {
        console.log('receive message' + message.data);
        // try {
        //     var obj = JSON.parse(message.data);
        //
        //     if (!obj.time || !obj.torque || !obj.displacement || !obj.velocity || !obj.acceleration) {
        //         return;
        //     }
        //
        //     torqueData.push.apply(torqueData, obj.torque);
        //     displacementData.push.apply(displacementData, obj.displacement);
        //     velocityData.push.apply(velocityData, obj.velocity);
        //     accelerationData.push.apply(accelerationData, obj.acceleration);
        //
        //     for (var i = 0; i < 2000; i++) {
        //       timeData.push(i);
        //     }
        //
        //
        //     // only keep no more than 50 points in the line chart
        //     const maxLen = 2000;
        //     var len = torqueData.length;
        //     if (len > maxLen) {
        //         torqueData.shift();
        //         displacementData.shift();
        //         velocityData.shift();
        //         accelerationData.shift();
        //     }
        //
        //     torqueChart.update();
        //     displacementChart.update();
        //     velocityChart.update();
        //     accelerationChart.update();
        // } catch (err) {
        //     console.error(err);
        // }
    }
});
