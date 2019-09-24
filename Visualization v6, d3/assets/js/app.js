// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 50, left: 50},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("All_calls.csv", function(data) {
console.log(data);

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0,1860])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0,d3.max(data, d => d.Implied_Volatility)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([0,d3.max(data, d => d.Implied_Volatility)])
    .range([ 4,18]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["AAPL","GOOG","FB","NFLX"])
    .range(d3.schemeSet2);

  var tick = ["AAPL","GOOG","FB","NFLX"];

  // Add a ticker for bubble
 // var Tick = d3.text()

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Strike); } )
      .attr("cy", function (d) { return y(d.Implied_Volatility); } )
      .attr("r", function (d) { return z(d.Implied_Volatility); } )
      .style("fill", function (d) { return myColor(d.Ticker); } )
      .style("opacity", "0.7")
      .attr("stroke", "white")
      .style("stroke-width", "1px");
 

  svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Calls Strike Price vs. Implied Volatility");

  var legend = svg.selectAll(".legend")
  .data(data).enter()
  .append("svg")
  .attr("class","legend")
  .attr("transform", "translate(" + 780 + "," + 120+ ")");

  legend.append("rect")
     .attr("x", 0) 
     .attr("y", function(d, i) { return 20 * i; })
     .attr("width", 15)
     .attr("height", 15)
		.style("fill", function(d) { return myColor(d.Ticker)});
   
    legend.append("text")
     .attr("x", 25) 
     .attr("text-anchor", "start")
     .attr("dy", "1em") 
     .attr("y", function(d, i) { return 20 * i; })
     .text(function(d, i) { return 20 })
    .attr("font-size", "12px"); 
  
    legend.append("text")
     .attr("x",31) 
     .attr("dy", "-.2em")
     .attr("y", -10)
     .text("Ticker")
   	.attr("font-size", "17px"); 
 });

// function updateData() {
// d3.csv("All_puts.csv", function(data) {
// console.log(data);

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain([0,1860])
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([0,d3.max(data, d => d.Implied_Volatility)])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add a scale for bubble size
//   var z = d3.scaleLinear()
//     .domain([0,d3.max(data, d => d.Implied_Volatility)])
//     .range([ 4,18]);

//   // Add a scale for bubble color
//   var myColor = d3.scaleOrdinal()
//     .domain(["AAPL","FB","GOOG","NFLX"])
//     .range(d3.schemeSet1);

//   var tick = ["AAPL","FB","GOOG","NFLX"];

//   // Add a ticker for bubble
//  // var Tick = d3.text()

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function (d) { return x(d.Strike); } )
//       .attr("cy", function (d) { return y(d.Implied_Volatility); } )
//       .attr("r", function (d) { return z(d.Implied_Volatility); } )
//       .style("fill", function (d) { return myColor(d.Ticker); } )
//       .style("opacity", "0.7")
//       .attr("stroke", "white")
//       .style("stroke-width", "1px");
 

//   svg.append("text")
//     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//     .attr("text-anchor", "middle")
//     .attr("font-size", "16px")
//     .text("Calls Strike Price vs. Implied Volatility");

//   var legend = svg.selectAll(".legend")
//   .data(data).enter()
//   .append("svg")
//   .attr("class","legend")
//   .attr("transform", "translate(" + 780 + "," + 120+ ")");

//   legend.append("rect")
//      .attr("x", 0) 
//      .attr("y", function(d, i) { return 20 * i; })
//      .attr("width", 15)
//      .attr("height", 15)
// 		.style("fill", function(d) { return myColor(d.Ticker)});
   
//     legend.append("text")
//      .attr("x", 25) 
//      .attr("text-anchor", "start")
//      .attr("dy", "1em") 
//      .attr("y", function(d, i) { return 20 * i; })
//      .text(function(d, i) { return 20 })
//     .attr("font-size", "12px"); 
  
//     legend.append("text")
//      .attr("x",31) 
//      .attr("dy", "-.2em")
//      .attr("y", -10)
//      .text("Ticker")
//    	.attr("font-size", "17px"); 
//  });
// }