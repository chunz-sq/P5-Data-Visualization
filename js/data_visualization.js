d3.csv("data/data.csv", function(d) {
  var format = d3.time.format("%Y");
  return {
    'Year': format.parse(d.year),
    'Carrier Name': d.carrier_name,
    'On Time': +d.on_time,
    'Arrivals': +d.arrivals
  };
}, function(data) {
  'use strict';

  // debugger;
  // append title
  d3.select('#content')
    .append('h2')
    .attr('id', 'title')
    .text('Yearly On-Time Arrival Rates for 5 Top U.S. Domestic Airlines from 2003 to 2015');

  // set svg
  var width = 960,
      height = 640;
  var svg = dimple.newSvg('#content', width, height);
  var myChart = new dimple.chart(svg, data);

  // set y axis
  var minY = 0.5,
      maxY = 1;
  var y = myChart.addMeasureAxis('y', 'On Time');
  // when check the variable data, the field names are different from the ones in csv file.
  y.tickFormat = '%';
  y.overrideMin = minY;
  y.overrideMax = maxY;
  y.title = 'Percentage of Arrivals on Time';

  // set x axis
  var x = myChart.addTimeAxis('x', 'Year');
  x.tickFormat = '%Y';
  x.title = 'Year';

  // set series and legend
  var scatter = myChart.addSeries('Carrier Name', dimple.plot.scatter);
  var line = myChart.addSeries('Carrier Name', dimple.plot.line);
  var legend = myChart.addLegend(width*0.65, 60, width*0.25, 80, 'right');

  // draw
  myChart.draw();

  // handle mouse events on paths
  function mouse() {
    d3.selectAll('path')
      .style('opacity', 0.25)
      .on('mouseover', function(e) {
        // debugger;
        d3.select(this)
          .style('stroke-width', '8px')
          .style('opacity', 1)
          .attr('z-index', '1');
    }).on('mouseleave', function(e) {
        d3.select(this)
          .style('stroke-width', '2px')
          .style('opacity', 0.25)
          .attr('z-index', '0');
    });
  }

  mouse()

});