dataset = [
    "area": [
        {"area": "East Asia & Pacific", 'le' : 73.79},
        {"area": "North America", 'le' : 78.24},
        {"area": "ELatin America & Caribbean", 'le' : 73.66},
        {"area": "Sub-Saharan Africa", 'le' : 55.38},
        {"area": "Middle East & North Africa", 'le' : 71.76},
        {"area": "South Asia", 'le' : 65.96},
        {"area": "Europe & Central Asia", 'le' : 75.25}
    ]
];

var diameter = 550;
var color = d3.scaleOrdinal(d3.schemeCategory20);
var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);
var svg = d3.select("#chartTop20")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.le; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.area
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function(d) {
        return d.area + ": " + d.le;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.le;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");