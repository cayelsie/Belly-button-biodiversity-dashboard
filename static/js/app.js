function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }


//Need to read the data and get needed items into variables
function getData() {
    d3.json("data/samples.json").then((subject) => {
    console.log(mydata);
      // Grab values from the data json object to build the plots
    //   var age = (subject.metadata.age);
    //   var bbtype = subject.metadata.bbtype;
    //   var ethnicity = subject.metadata.ethnicity;
    //   var gender = subject.metadata.gender;
    //   var location = subject.metadata.location;
    //   var wfreq = subject.metadata.wfreq;
    //   var sample = subject.metadata.id;
    //   console.log(subject);
    });
};

getData();


//Create a function for creating the dropdown menu - call it so the user can see the menu initially


//Create a function for creating the table - will be called within the change option 


//Create a function for creating the pie chart - will be called within the change option



// Use D3 to create an event handler for the dropdown menu
d3.selectAll("body").on("change", updatePage);

function updatePage() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu item ID to a variable
    var dropdownMenuID = dropdownMenu.id;
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;