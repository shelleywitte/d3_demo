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

}
