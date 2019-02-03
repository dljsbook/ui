// import rough from 'roughjs/bin/wrappers/rough';
import * as d3 from 'd3';

const data = [4, 8, 15, 16, 23, 42];

const drawChart = (target: HTMLElement) => {
  d3.select(target)
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
  /*
  const canvas = document.createElement('canvas');
  target.appendChild(canvas);
  const rc = rough.canvas(canvas, {
    options: {
      fill: "blue",
      roughness: 0.8,
      bowing: 0.7
    }
  });

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('No context found');
  }

  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = canvas.width - margin.left - margin.right,
    height = canvas.height - margin.top - margin.bottom;
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);
  context.translate(margin.left, margin.top);

  d3.tsv("data.tsv", (d) => {
    d.frequency = +d.frequency;
    return d;
  }, function (error, data) {
    if (error) throw error;

    x.domain(data.map(function (d) { return d.letter; }));
    y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

    const yTickCount = 10,
      yTicks = y.ticks(yTickCount),
      yTickFormat = y.tickFormat(yTickCount, "%");

    data.forEach(function (d) {
      rc.rectangle(x(d.letter), y(d.frequency), x.bandwidth(), height - y(d.frequency));
    });


    context.beginPath();
    x.domain().forEach(function (d) {
      context.moveTo(x(d) + x.bandwidth() / 2, height);
      context.lineTo(x(d) + x.bandwidth() / 2, height + 6);
    });
    context.strokeStyle = "black";
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "top";
    x.domain().forEach(function (d) {
      context.fillText(d, x(d) + x.bandwidth() / 2, height + 6);
    });

    context.beginPath();
    yTicks.forEach(function (d) {
      context.moveTo(0, y(d) + 0.5);
      context.lineTo(-6, y(d) + 0.5);
    });
    context.strokeStyle = "black";
    context.stroke();

    context.textAlign = "right";
    context.textBaseline = "middle";
    yTicks.forEach(function (d) {
      context.fillText(yTickFormat(d), -9, y(d));
    });

    context.beginPath();
    context.moveTo(-6.5, 0 + 0.5);
    context.lineTo(0.5, 0 + 0.5);
    context.lineTo(0.5, height + 0.5);
    context.lineTo(-6.5, height + 0.5);
    context.strokeStyle = "black";
    context.stroke();

    context.save();
    context.rotate(-Math.PI / 2);
    context.textAlign = "right";
    context.textBaseline = "top";
    context.font = "bold 10px sans-serif";
    context.fillText("Frequency", -10, 10);
    context.restore();
  });
*/
};

export default drawChart;
