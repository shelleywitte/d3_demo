/* 575 boilerplate main.js */
window.onload = function(){
    // creates empty array
    var w = 900, h = 500;
    var container = d3.select("body") // gets the <body> element from the DOM
        .append("svg") //adds SVG operand to body
        .attr("width", w) // width attribute
        .attr("height", h) // height attribute
        .attr("class", "container") // class name which allows it to be modified in style.css or refered to in future code

    // creates inner rectangle (making larger rectangle the frame/border)
    var innerRect = container.append("rect")
        .datum(400) // attaches datum, as a parameter, to the selection
        .attr("width", function (d) {
            return d * 2; //taking the datum and calculating a width for the inner rectangle
        })
        .attr("height", function (d) {
            return d; // height of inner rectangle using datum
        })
        .attr("class", "innerRect") // assigning class name
        .attr("x", 50) // horizonal position relative to the top left corner
        .attr("y", 50); // vertical position relative to top left corner

    var cityPop = [  // cityPop array with four objects each with a population and city property
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
    var x = d3.scale.linear() // creates the x/horizontal scale of the bubble chart
        .range([90, 685]) // output min and max
        .domain([0, 3]); // input min and max

    var minPop = d3.min(cityPop, function(d) {
        return d.population; // finds min value of data array (Minneapolis population)
    });

    var maxPop = d3.max(cityPop, function (d) {
        return d.population;  // finds max value of data array (Washington DC population)
    });

    var y = d3.scale.linear()
        .range([450, 50]) // range of SVG to build circles (bottom up)
        .domain([0, 800000]); // y-axis scale limits

    var color = d3.scale.linear()  // creates color scale for circle fill color
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([ // fill color of circle based on interpolation between the two colors above
            minPop,
            maxPop
        ]);

    var yAxis = d3.svg.axis() // axis generator function
        .scale(y) // feeds y scale (from above)
        .orient("left") // left side of SVG

    var axis = container.append("g")  // axis group element
        .attr("class", "axis")
        .attr("transform", "translate(49, 0)") // moves scale into view (move to the right 49 pixels, no vertical movement)
        .call(yAxis);

    // creates bubble chart title
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");

    // creates labels for each circle
    var labels = container.selectAll(".labels")
        .data(cityPop) // label info coming from data array
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d) { // vertical position of circle labels (centered on each circle)
            return y(d.population) + -3;
        });

    var nameLine = labels.append("tspan")
        .attr("class", nameLine)
        .attr("x", function(d, i) {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5; // horizontal position of circle labels (relative to circles)
        })
        .text(function(d) {
            return d.city;  // displaying city property
        });

    // formats the population property data to include a comma for readibility
    var format = d3.format(",");

    // offsets the population property line so that it's not on top of the city property information
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d, i) {
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15") // vertical offset
        .text(function(d) {
            return "Pop. " + format(d.population);
        });

    // creating placehold as parameter named for a future element
    var circles = container.selectAll(".circles")
        .data(cityPop)  //data array used
        .enter() //joins data to selection
        .append("circle") // adds a circle for each datum
        .attr("class", "circles") // class name
        .attr("id", function(d) {
            return d.city; // assign city name as circle ID
        })
        .attr("r", function(d) { // circle radius based on pop value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            return x(i); // places each circle horizontally
        })
        .attr("cy", function (d) {
            return y(d.population); // center y coordinates for each circle based on scale range of populations in data array
        })
        .style("fill", function(d, i) {
            return color(d.population); // fill color of circle based on color scale generator
        })
        .style("stroke", "#000"); // black circle stroke
}
