
//Need to read the data and get needed items into variables
function getData() {
    //Reads json data file: "subject" encompasses the entire thing
    d3.json("data/samples.json").then((subject) => {
        // Grab values from the data json object to build the plots
        //First get the metadata section and then loop through arrays to get individual items

        var age = subject.metadata.map(row => row.age);
        var bbtype = subject.metadata.map(row => row.bbtype);
        var ethnicity = subject.metadata.map(row => row.ethnicity);
        var gender = subject.metadata.map(row => row.gender);
        var location = subject.metadata.map(row => row.location);
        var wfreq = subject.metadata.map(row => row.wfreq);
        var sample = subject.metadata.map(row => row.id);

        console.log(sample);

    });
};

//Call the function 
getData();
// console.log(bbtype);


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
        createTable(names[0])
        buildChart(names[0])

    });
};
dropdown();

//Function for on change/user selection
function optionChanged(newID) {
    createTable(newID);
    buildChart(newID);
    //Set dropdown menu to a variable
    // var dropdownMenu = d3.select("#selDataset");

    // //Set user selection to a variable
    // var selection = dropdownMenu.property("value");
    // console.log(selection);

    //Set panel area to a variable
    //     var panel = d3.select("#sample-metadata");

    //    //Reads json data file: "subject" encompasses the entire thing
    //    d3.json("data/samples.json").then((subject) => {

    //     //Select metadata from JSON
    //     var data = subject.metadata;

    //     //Filter the metadata by the user selection of id; change id to string form
    //     var selectData = data.filter(item => item.id.toString() === newID)[0];

    //     //Reset panel each time
    //     panel.html("");

    //     //Loop through key/value pairs in selected metadata
    //     Object.entries(selectData).forEach((set) => {

    //     //Append the panel area as an h5 element with each key/value pair
    //             panel.append("h5").text(set[0] + ": " + set[1]);
    //         });
    //    });
};

//Note that it won't allow selection of 940 from the beginning. Must select it after something else


//Function for populating bar graph after user selection from dropdown
function buildChart(newID) {

    //Reads json data file: "subject" encompasses the entire thing
    d3.json("data/samples.json").then((subject) => {

        //Select samples section from JSON
        var samples = subject.samples;
        console.log(samples);

        //Filter the samples by the user's ID selection, select 0 for value only
        var selectSample = samples.filter(item => item.id === newID)[0];
        console.log(selectSample);

        //Pull sample values, otu id, and otu labels into variables
        var sampleValues = selectSample.sample_values
        var otu_ids = selectSample.otu_ids
        var otu_labels = selectSample.otu_labels
        
        //Set up trace for horizontal bar graph
        var trace = [{
            y: otu_ids.slice(0, 10).map(x => `OTU ID ${x}`),
            x: sampleValues.slice(0, 10),
            type: "bar",
            orientation: "h"
        }];

        //Set up layout for horizontal bar graph
        var layout = {
            title: "Amount and Type of Bacteria Found",
            xaxis: { title: "otu_id" },
            yaxis: { title: "sample values" }
        };

        //Plot the bar graph
        Plotly.newPlot("bar", trace, layout);

        //Set up trace for bubble chart
        var bubble_trace = [{
            x: otu_ids,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: [35, 10, 50, 40, 18, 30],
                colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']],
                cmin: 0,
                cmax: 700
            }
        }];

        //Set up layout for bubble char
        var bubble_layout = {
            title: "Bacteria Bubble Chart",
            xaxis: {title: "OTU ID"}
        };

        //Plot bubble chart
        Plotly.newPlot("bubble", bubble_trace, bubble_layout);

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