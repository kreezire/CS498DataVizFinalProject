var margin4 = {
        top: 20,
        right: 210,
        bottom: 50,
        left: 70
    },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin4.left - margin4.right,
    height = outerHeight - margin4.top - margin4.bottom;

var svg4 = d3.select("#bar4").append("svg")
	.attr("width", outerWidth)
        .attr("height", outerHeight)
	.append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

d3.csv("countriesoftheworld.csv", function(error, data){

	// filter year
	//var data = data.filter(function(d){return d.Year == '2012';});
	// Get every column value
	var elements = Object.keys(data[0]);
		//.filter(function(d){
			//return ((d != "Year") & (d != "Region"));
//	});
	var selection = "Infant_mortality";

	var y4 = d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return +d.Infant_mortality;
			})])
			.range([height, 0]);

	var x4 = d3.scale.ordinal()
			.domain(data.map(function(d){ return d.Region;}))
			.rangeBands([0, width]);


	var xAxis4 = d3.svg.axis()
		.scale(x4)
	    .orient("bottom");

	var yAxis4 = d3.svg.axis()
		.scale(y4)
	    .orient("left");

	svg4.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis4)
    	.selectAll("text")
    	.style("font-size", "8px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );


 	svg4.append("g")
    	.attr("class", "y axis")
    	.call(yAxis4);

	svg4.selectAll("rectangle")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","rectangle")
		.attr("width", width/data.length)
		.attr("height", function(d){
			return height - y4(+d.Infant_mortality);
		})
		.attr("x", function(d, i){
			return (width / data.length) * i ;
		})
		.attr("y", function(d){
			return y4(+d.Infant_mortality);
		})
		.append("title")
		.text(function(d){
			return d.Region + " : " + d.Infant_mortality;
		});

	
});
