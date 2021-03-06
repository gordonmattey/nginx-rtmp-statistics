;(function (window, document, undefined) {

  'use strict';

  var ChartRtmpBits = (function () {

    var data = [
      {
        key: 'In',
        color: '#7777ff',
        values: []
      },
      {
        key: 'Out',
        color: '#DE4545',
        values: []
      }
    ];

    var chart;

    var _populate = function (bindto) {
      var svg = d3.select(bindto)
                  .datum(data)
                  .call(chart);

      svg.append("text")
        .attr("x", '50%' )
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Bandwidth RTMP");
    }

    return {

      init : function (bindto, timestamp, bw_in, bw_out) {
        data[0].values.push({ x: timestamp, y: bw_in });
        data[1].values.push({ x: timestamp, y: bw_out });

        if (chart) {
          _populate(bindto);
          chart.update();
        } else {
          nv.addGraph(function() {
            chart = nv.models.lineChart().options({
              duration: 0,
              useInteractiveGuideline: true,
              interactive: false,
              showLegend: true,
              showXAxis: true,
              showYAxis: true
            });

            chart.xAxis
              .axisLabel('Uptime')
              .tickFormat(Format.time);

            chart.yAxis
              .axisLabel('Bandwidth (bits)')
              .tickFormat(d3.format('d'));

            _populate(bindto);

            nv.utils.windowResize(chart.update);

            return chart;
          });
        }
      }

    }

  })();

  window.ChartRtmpBits = ChartRtmpBits;

})(window, document);
