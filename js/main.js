/* 575 boilerplate main.js */
window.onload = function(){
    // creates empty array
    var w = 900, h = 500;
    var container = d3.select("body") // get the <body> element from the Dom
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "container")

    var innerRect = container.append("rect")
        .datum(400)
        .attr("width", function (d) {
            return d * 2;
        })
        .attr("height", function (d) {
            return d;
        })
        .attr("class", "innerRect")
        .attr("x", 50)
        .attr("y", 50);

    var cityPop = [
        {
            city: 'Minneapolis',
            population: 400070
        },
        {
            city: 'Portland',
            population: 609456
        },
        {
            city: 'Denver',
            population: 649495
        },
        {
            city: 'Washington, D.C.',
            population: 658983
        }
    ];

    // creates a generator that will decided where in the range each output value lies based on each input datum
    var x = d3.scale.linear() // create the scale
        .range([90, 685]) // output min and max
        .domain([0, 3]); //input min and max

    var minPop = d3.min(cityPop, function(d) {
        return d.population;
    });

    var maxPop = d3.max(cityPop, function (d) {
        return d.population;
    });

    var y = d3.scale.linear()
        .range([450, 50])
        .domain([0, 800000]);

    var color = d3.scale.linear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(49, 0)")
        .call(yAxis);

    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");

    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d) {
            return y(d.population) + -2;
        });

    var nameLine = labels.append("tspan")
        .attr("class", nameLine)
        .attr("x", function(d, i) {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d) {
            return d.city;
        });

    var format = d3.format(",");

    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d, i) {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15")
        .text(function(d) {
            return "Pop. " + format(d.population);
        });

    // creating placehold as parameter named for a future element
    var circles = container.selectAll(".circles")
        .data(cityPop)
        .enter() //joins data to selection
        .append("circle")
        .attr("class", "circles")
        .attr("id", function(d) {
            return d.city;
        })
        .attr("r", function(d) { // circle radius based on pop value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            return x(i);
        })
        .attr("cy", function (d) {
            return y(d.population);
        })
        .style("fill", function(d, i) {
            return color(d.population); // fill based on color scale generator
        })
        .style("stroke", "#000"); // black circle stroke
}
