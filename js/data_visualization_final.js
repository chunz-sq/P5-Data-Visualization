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
  var legend = myChart.addLegend(width*0.55, 95, width*0.45, 80, 'left');

  legend.fontSize = '14px';

  // draw
  myChart.draw();

  // change gridline opacity
  y.gridlineShapes.selectAll('line')
    .style('opacity', 0.25)


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

        var airline = this.id
        d3.selectAll('g.dimple-legend')
          .style('opacity', function(d) {
            // debugger;
            if (d.key === airline) {
              return 1;
            } else {
              return 0.25;
            }
          })

    }).on('mouseleave', function(e) {
        d3.select(this)
          .style('stroke-width', '2px')
          .style('opacity', 0.25)
          .attr('z-index', '0');
        d3.selectAll('g.dimple-legend')
          .style('opacity', 1)
    });
  }

  // make mouseover events available by default
  mouse();

  // empty out legends
  myChart.legends = [];

  // add legends title to prompt user to click
  svg.selectAll('title_text')
          .data(['Click legend to show/hide Airlines:'])
          .enter()
          .append('text')
              .attr('x', width*0.55)
              .attr('y', function (d, i) { return 80 + i * 14; })
              .style('font-family', 'sans-serif')
              .style('font-size', '14px')
              .style('color', 'Black')
              .text(function (d) { return d; });

  // get a unique list of Airline values to use when filtering
  var filterValues = dimple.getUniqueValues(data, 'Carrier Name');
  // debugger;

  // get all the rectangles from now orphaned legend
  legend.shapes.selectAll('rect')
  .on('click', function (e) {
      // debugger;
      var hide = false;
      var newFilters = [];
      // if the filters contain the clicked shape, hide it
      filterValues.forEach(function (f) {
          if (f === e.aggField.slice(-1)[0]) {
              hide = true;
              } else {
                  newFilters.push(f);
              }
          });
          // hide the shape or show it
          if (hide) {
              d3.select(this).style('opacity', 0.25);
          } else {
              newFilters.push(e.aggField.slice(-1)[0]);
              d3.select(this).style('opacity', 1);
          }
          // Update the filters
          filterValues = newFilters;

          // Filter the data for only scatter and line plots
          scatter.data = dimple.filterData(data, 'Carrier Name', filterValues);
          line.data = dimple.filterData(data, 'Carrier Name', filterValues);
          // draw modified chart with animation and mouseover events
          myChart.draw(800);
          mouse();
      });

});
