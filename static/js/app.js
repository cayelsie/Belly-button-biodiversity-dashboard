
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

//       var dropdownMenu = d3.select("#selDataset");


//     for (var i = 0; i < sample.length; i++) {
//         var options = sample[i];
//         var element = document.createElement("option");
//         element.text = options;
//         element.value = options;
//         dropdownMenu.appendChild(element);
//         }
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

});
};
dropdown();

//Function for populating panel after user selection
function optionChanged() {

    //Set dropdown menu to a variable
    var dropdownMenu = d3.select("#selDataset");

    //Set user selection to a variable
    var selection = dropdownMenu.property("value");
    // console.log(selection);

    //Set panel area to a variable
    var panel = d3.select("#sample-metadata");

   //Reads json data file: "subject" encompasses the entire thing
   d3.json("data/samples.json").then((subject) => {
    
    //Select metadata from JSON
    var data = subject.metadata;

    //Filter the metadata by the user selection of id; change id to string form
    var selectData = data.filter(item => item.id.toString() === selection)[0];
    panel.html(""); 
    Object.entries(selectData).forEach((set) => {
            panel.append("h5").text(set[0] + ": " + set[1]);
        });
   });
};