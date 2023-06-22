exports.cricleChart = function trafficRoomChart(cpvSelector, seriesData, labels) {
  var cpv = e.select(cpvSelector);
  console.log(cpvSelector)
  if (e.isVariableDefined(cpv)) {
    // CHART: Page Views
    var options = {
      series: seriesData,
      labels: labels,
      chart: {
        height: 300,
        width: 300,
        offsetX: 0,
        type: 'donut',
        sparkline: {
          enabled: true
        }
      },
      colors: [
        ThemeColor.getCssVariableValue('--bs-success'),
        ThemeColor.getCssVariableValue('--bs-danger'),
        ThemeColor.getCssVariableValue('--bs-primary'),
      ],
      tooltip: {
        theme: "dark"
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 200,
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    var chart = new ApexCharts(cpv, options);
    chart.render();
  }
}
