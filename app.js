$(document).ready(function () {
  
  var defData = [{date:0, count:0}];
  $.getJSON('event.json', function (data) {
    defData = data.results;
    var chart = new tauCharts.Chart({
      data: defData,
      type: 'line',
      x: 'time',
      y: 'count',
      color: 'type'
    });
    chart.renderTo('#line');
  });
});