// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function(data) {
  var testid = data.names;

  var sampleValues = [];
  var otuValues = [];
  var otuLabels = [];

  console.log(testid);

  for (var i = 0; i < data.names.length; i++) {
    sampleValues.push(data.samples.map(item => item.sample_values));
    otuValues.push(data.samples.map(item => item.otu_ids));
    // var sortedotuValues = otuValues.sort((a, b) => b - a);
    otuLabels.push(data.samples.map(item => item.otu_labels));
  }

  console.log(sampleValues);
  console.log(otuValues);
  // console.log(sortedotuValues);

  // Create a dynamic dropdown menu
  console.log(data);
  testid.forEach(function(option) {
    var sel = document.getElementById("selDataset");
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(option));
    opt.value = option;
    sel.appendChild(opt);
  });
});

d3.select("#selDataset").on("change", optionChanged);

function optionChanged() {
  var dropdownMenu = d3.select("#selDataset");
  var dropdownValue = dropdownMenu.property("value");
  console.log(`Currently test id ${dropdownValue} is shown on the page`);

  // Update graph
}

//   var sampleValues = data.samples.map(item => item.sample_values[0]);
//   var otuValues = data.samples.map(item => item.otu_ids[0]);
//   // var sortedotuValues = otuValues.sort((a, b) => b - a);
//   var otuLabels = data.samples.map(item => item.otu_labels[0]);
//   console.log(sampleValues);
//   console.log(otuValues);
//   console.log(sortedotuValues);
// });

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Use sample_values as the values for the bar chart.

// Use otu_ids as the labels for the bar chart.

// Use otu_labels as the hovertext for the chart.
// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.

// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// Update all of the plots any time that a new sample is selected.
