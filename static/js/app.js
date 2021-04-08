
//Create a function for creating the dropdown menu - call it so the user can see the menu initially
function dropdown() {

    // set dropdown menu to variable
    var dropdownMenu = d3.select("#selDataset");
    //Reads json data file: "subject" encompasses the entire thing
    d3.json("data/samples.json").then((subject) => {
        var names = subject.names
        // console.log(names);

        //Loop through the id numbers and add to dropdownMenu
        names.forEach(id => {
            dropdownMenu.append("option").text(id).property("value");

        });

        //Call later functions for making the panel & the chart so they are initially displayed
        createTable(names[0])
        buildChart(names[0])

    });
};
dropdown();

//Function for on change/user selection
function optionChanged(newID) {
    createTable(newID);
    buildChart(newID);

};

//Function for populating bar graph after user selection from dropdown
function buildChart(newID) {

    //Reads json data file: "subject" encompasses the entire thing
    d3.json("data/samples.json").then((subject) => {

        //Select samples section from JSON
        var samples = subject.samples;
        console.log(samples);

        //Filter the samples by the user's ID selection, select 0 for value only
        var selectSample = samples.filter(item => item.id === newID)[0];
        // console.log(selectSample);

        //Pull sample values, otu id, and otu labels into variables
        var sampleValues = selectSample.sample_values;
        var otu_ids = selectSample.otu_ids;
        var otu_labels = selectSample.otu_labels;

        //Get metadata from JSON to build gauge
        var meta = subject.metadata;

        //Filter the metadata by the user selection of id; change id to string form
        var metaFilter = meta.filter(row => row.id.toString() === newID)[0];

        //Get the washing frequency into a variable
        var wfreq = metaFilter.wfreq;
        console.log(wfreq);

        //Set up trace for horizontal bar graph
        var trace = [{
            y: otu_ids.slice(0, 10).reverse().map(x => `OTU ID ${x}`),
            x: sampleValues.slice(0, 10).reverse(),
            text: otu_labels,
            type: "bar",
            orientation: "h"
        }];

        //Set up layout for horizontal bar graph
        var layout = {
            title: "Top 10 OTUs Found",
            xaxis: { title: "Sample Values" },
            height: 600,
            width: 350

        };

        //Plot the bar graph
        Plotly.newPlot("bar", trace, layout);

        //Set up trace for bubble chart
        var bubbleTrace = [{
            x: otu_ids,
            y: sampleValues,
            mode: "markers",
            text: otu_labels,
            marker: {
                size: sampleValues,
                // color: [35, 10, 50, 40, 18, 30],
                color: otu_ids,
                // colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']],
                colorscale: "Jet"
                // cmin: 0,
                // cmax: 300
            }
        }];

        //Set up layout for bubble chart
        var bubbleLayout = {
            // title: "Bacteria Bubble Chart",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            height: 500,
            width: 1100
        };

        //Plot bubble chart
        Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);

        //Set up trace for gauge chart
        var gaugeTrace = [{

            //Set up needle
            type: 'scatter',
            x: [0], y: [0],
            marker: { size: 28, color: '850000' },
            showlegend: false
        },

        // Set up gauge panel
        {
            type: "pie",
            showlegend: false,
            hole: 0.6,
            rotation: 90,
            values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            hoverinfo: "none",
            marker: {
                colors: ["deeppink", "red", "orangered", "orange", "yellow", "green", "blue", "purple", "indigo", "white"],
            }
        }];

        //Equations for controlling the gauge needle according to data
        var degrees = (wfreq * 20);
        var radius = .6;
        var radians = degrees * Math.PI / 180;
        var x = -1 * radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        //Path for the triangle of needle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        //Layout for gauge chart
        var layout = {

            shapes: [{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],

            title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
            height: 600,
            width: 600,
            xaxis: { visible: false, range: [-1, 1] },
            yaxis: { visible: false, range: [-1, 1] }
        };

        //Plot gauge chart
        Plotly.newPlot("gauge", gaugeTrace, layout);
    });

};

//Function for populating the panel after selection from dropdown
function createTable(newID) {
    //Set panel area to a variable
    var panel = d3.select("#sample-metadata");

    //Reads json data file: "subject" encompasses the entire thing
    d3.json("data/samples.json").then((subject) => {

        //Select metadata from JSON
        var data = subject.metadata;

        //Filter the metadata by the user selection of id; change id to string form
        var selectData = data.filter(item => item.id.toString() === newID)[0];

        //Reset panel each time
        panel.html("");

        //Loop through key/value pairs in selected metadata
        Object.entries(selectData).forEach((set) => {

            //Append the panel area as an h5 element with each key/value pair
            panel.append("h5").text(set[0] + ": " + set[1]);
        });
    });
};