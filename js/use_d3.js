// console.log("this is use_d3.js");

const drawBtn = document.getElementById("drawBar");
drawBtn.addEventListener("click", draw);

function draw() {

  var svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var y = d3
    .scaleBand()              // x = d3.scaleBand()
    .rangeRound([0, height])  // .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3
    .scaleLinear()            // y = d3.scaleLinear()
    .rangeRound([0, width]);  // .rangeRound([height, 0]);

  var z = d3
    .scaleOrdinal()
    .range([
      "#8696a7",
      "#9ca8b8",
      "#e9e3e3",
      "#96a48b",
      "#b5c4b1",
      "#d8caaf",
      "#c5b8a5",
      "#e0cdcf",
      "#965454",
      "#6b5152",
      "#7a7281",
      "#c9c0d3"
    ]);

  d3.csv(
    "data1.csv",

    function (d, i, columns) {
      console.log(d);
      for (i = 1, t = 0; i < columns.length; ++i)
        // console.log(columns[i]);       // every attribute name
        t += d[columns[i]] =+ d[columns[i]];
        d.total = t;
      return d;
    },

    function (error, data) {
      if (error) throw error;

      var keys = data.columns.slice(1);
      // console.log(keys);   // every attribute name

      data.sort(function (a, b) {
        return b.total - a.total;   // descending order
      });

      y.domain(      // x.domain...
        data.map(function (d) {
          return d.Name;
        })
      );

      x.domain([     // y.domain...
        0,
        d3.max(data, function (d) {
          return d.total;
        }),
      ]).nice();

      z.domain(keys);

      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter()
        .append("g")
        .attr("fill", function (d) {
          return z(d.key);
        })
        .selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("y", function (d) {       //.attr("x", function(d) { return x(d.data.Name); })
          return y(d.data.Name);
        })
        .attr("x", function (d) {       //.attr("y", function(d) { return y(d[1]); })
          return x(d[0]);
        })
        .attr("width", function (d) {   //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
          return x(d[1]) - x(d[0]);
        })
        .attr("height", y.bandwidth()); //.attr("width", x.bandwidth());

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)") //  .attr("transform", "translate(0," + height + ")")
        .call(d3.axisLeft(y));          // .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")") // New line
        .call(d3.axisBottom(x).ticks(null, "s")) // .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("y", 2)                   // .attr("y", 2)
        .attr("x", x(x.ticks().pop()) + 0.5) // .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")           // .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        // .text("Population")
        .attr("transform", "translate(" + -width + ",-10)"); // Newline

      var legend = g
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter()
        .append("g")
        //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
        .attr("transform", function (d, i) {
          return "translate(25," + (80 + i * 20) + ")";
        });

      legend
        .append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

      legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
          return d;
        });
    }
  );
}
