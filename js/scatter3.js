var margin3 = {
        top: 20,
        right: 210,
        bottom: 50,
        left: 70
    },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin3.left - margin3.right,
    height = outerHeight - margin3.top - margin3.bottom;

var x3 = d3.scale.linear()
    .range([0, width]).nice();

var y3 = d3.scale.linear()
    .range([height, 0]).nice();

var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom")
    .tickSize(-height);

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left")
    .tickSize(-width);

var xCat3 = "Literacy",
    yCat3 = "Agriculture",
    colorCat3 = "Region";

var labels3 = {
    "Region": "Region",
    "Agriculture": "Agriculture",
    "Literacy": "Literacy"
}

d3.csv("countriesoftheworld.csv", function(data) {
    data.forEach(function(d) {
        d.Literacy = +d.Literacy;
        d.Agriculture = +d.Agriculture;
        d.Region = d.Region;
    });

    var xMax3 = d3.max(data, function(d) {
            return d[xCat3];
        }) * 1.05,
        xMin3 = d3.min(data, function(d) {
            return d[xCat3];
        }),
        xMin3 = xMin3 > 0 ? 0 : xMin3,
        yMax3 = d3.max(data, function(d) {
            return d[yCat3];
        }) * 1.05,
        yMin3 = d3.min(data, function(d) {
            return d[yCat3];
        }),
        yMin3 = yMin3 > 0 ? 0 : yMin3;
    x3.domain([xMin3, xMax3]);
    y3.domain([yMin3, yMax3]);
    var color = d3.scale.category10();

    var tip = d3.tip()
        .attr("class", "d3-tip3")
        .offset([-10, 0])
        .html(function(d) {
            return labels3[xCat3] + ": " + d[xCat3] + "<br>" + labels3[yCat3] + ": " + d[yCat3] + "<br>" + labels3[colorCat3] + ": " + d[colorCat3];
        });

    var zoomBeh3 = d3.behavior.zoom()
        .x(x3)
        .y(y3)
        .scaleExtent([0, 1000])
        .on("zoom", zoom3);

    var svg3 = d3.select("#scatter3")
        .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")")
        .call(zoomBeh3);
    svg3.call(tip);
    svg3.append("rect")
        .attr("width", width)
        .attr("height", height);
    svg3.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis3)
        .append("text")
        .classed("label3", true)
        .attr("x", width)
        .attr("y", margin3.bottom - 10)
        .style("text-anchor", "end")
        .text("Literacy");
    svg3.append("g")
        .classed("y axis", true)
        .call(yAxis3)
        .append("text")
        .classed("label3", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin3.left)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("Agriculture");

    var objects = svg3.append("svg")
        .classed("objects3", true)
        .attr("width", width)
        .attr("height", height);
    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x", width)
        .attr("y", 0)
        .attr("transform", "translate(0," + height + ")");
    objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x", 0)
        .attr("y", height);
    objects.selectAll(".dot3")
        .data(data)
        .enter().append("circle")
        .classed("dot3", true)
        .attr({
            r: function(d){return 5;},
            cx: function(d) {
                return x3(d[xCat3]);
            },
            cy: function(d) {
                return y3(d[yCat3]);
            }
        })
    .style("fill", function(d) {
        return color(d[colorCat3]);
    })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    var legend = svg3.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .classed("legend3", true)
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        })
		.attr("overflow", "auto");
    legend.append("rect")
        .attr("x", width + 10)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", color);
    legend.on("click", function(type) {
        // dim all of the icons in legend
        d3.selectAll(".legend3")
            .style("opacity", 0.1);
        // make the one selected be un-dimmed
        d3.select(this)
            .style("opacity", 1);
        // select all dot3s and apply 0 opacity (hide)
        d3.selectAll(".dot3")
        // .transition()
        // .duration(500)
        .style("opacity", 0.0)
        // filter out the ones we want to show and apply properties
        .filter(function(d) {
            return d["Region"] == type;
        })
            .style("opacity", 1) // need this line to unhide dot3s
        .style("stroke", "black")
        // apply stroke rule
        .style("fill", function(d) {
            
        });
    });
    legend.append("text")
        .attr("x", width + 26)
        .attr("dy", ".65em")
		.style("font-size","12px")
        .text(function(d) {
            return d;
        });
    d3.select("button.reset3").on("click", change3)
    //d3.select("button.changexlos").on("click", updatex)

    function change3() {
        xMax3 = d3.max(data, function(d) {
            return d[xCat3];
        });
        xMin3 = d3.min(data, function(d) {
            return d[xCat3];
        });
        zoomBeh3.x(x3.domain([xMin3, xMax3])).y(y3.domain([yMin3, yMax3]));

        var svg3 = d3.select("#scatter3").transition();
        svg3.select(".x.axis").duration(750).call(xAxis3).select(".label3").text(labels3[xCat3]);
        objects.selectAll(".dot3").transition().duration(1000)
            .attr({
                r: function(d){return 5;},
                cx: function(d) {
                    return x3(d[xCat3]);
                },
                cy: function(d) {
                    return y3(d[yCat3]);
                }
            })
    }

    function zoom3() {
        svg3.select(".x.axis").call(xAxis3);
        svg3.select(".y.axis").call(yAxis3);
        svg3.selectAll(".dot3")
            .attr({
				r: function(d){return 5;},
                cx: function(d) {
                    return x3(d[xCat3]);
                },
                cy: function(d) {
                    return y3(d[yCat3]);
                }
            })
            // .attr("transform", transform);
    }

    function transform(d) {
        return "translate(" + x3(d[xCat3]) + "," + y3(d[yCat3]) + ")";
    }

    function updatex3() {
        xCat3 = "Literacy",
        yCat3 = "Agriculture",
        colorCat3 = "Region";
        xMax3 = d3.max3(data, function(d) {
            return d[xCat3];
        }) * 1.05,
        xMin3 = d3.min(data, function(d) {
            return d[xCat3];
        }),
        xMin3 = xMin3 > 0 ? 0 : xMin3,
        yMax3 = d3.max3(data, function(d) {
            return d[yCat3];
        }) * 1.05,
        yMin3 = d3.min(data, function(d) {
            return d[yCat3];
        }),
        yMin3 = yMin3 > 0 ? 0 : yMin3;
        x.domain([xMin3, xMax3]);
        y.domain([yMin3, yMax3]);

        var zoomBeh3 = d3.behavior.zoom()
            .x3(x)
            .y3(y)
            .scaleExtent([0, 1000])
            .on("zoom", zoom3);

        var svg3 = d3.select("#scatter3").select("svg").transition();
        svg3.select(".y.axis")
            .duration(1000)
            .call(yAxis3);
        svg3.select('.x.axis')
            .duration(1000)
            .call(xAxis3);
        svg3.select('.label')
            .duration(1000)
        .attr("x", width)
            .attr("y", margin3.bottom - 10)
            .style("text-anchor", "end")
            .text("Length of Stay");

        d3.select("#scatter3").selectAll("circle.dot3")
            .transition()
            .duration(1000)
            .attr({
                r: function(d){return 5;},
                cx: function(d) {
                    return x3(d[xCat3]);
                },
                cy: function(d) {
                    return y3(d[yCat3]);
                }
            })
    }
});