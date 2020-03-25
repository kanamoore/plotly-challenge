// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function(data) {
  console.log(data);
  var testid = data.names;

  // Create a dynamic dropdown menu
  console.log(testid);
  testid.forEach(function(option) {
    var sel = document.getElementById("selDataset");
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(option));
    opt.value = option;
    sel.appendChild(opt);
  });

  // Retrive the selected option and use it to get index
  var dropdownMenu = d3.select("#selDataset");
  var dropdownValue = dropdownMenu.property("value");

  // Retrive index number of testid array using dropdownValue
  var index = testid.indexOf(dropdownValue);
  console.log(index);

  var defaultsampleData = data.samples[index].sample_values
    .slice(0, 10)
    .reverse();
  var defaultotuData = data.samples[index].otu_ids.slice(0, 10).reverse();
  var defaultotuLabels = data.samples[index].otu_labels.slice(0, 10).reverse();
  var defaultyxis = defaultotuData.map(a => "OTU" + a);

  var bardata = [
    {
      x: defaultsampleData,
      y: defaultyxis,
      type: "bar",
      orientation: "h",
      text: defaultotuLabels
    }
  ];

  Plotly.newPlot("bar", bardata);

  // // Create a bubble chart
  // var bubbledata = [
  //   {
  //     x: data.samples[0].otu_ids,
  //     y: data.samples[0].sample_values,
  //     mode: "markers",
  //     text: data.samples[0].otu_labels,
  //     marker: {
  //       size: data.samples[0].sample_values
  //       // color: [
  //       //   "rgb(93, 164, 214)",
  //       //   "rgb(255, 144, 14)",
  //       //   "rgb(44, 160, 101)",
  //       //   "rgb(255, 65, 54)"
  //       // ]
  //     }
  //   }
  // ];

  // Plotly.newPlot("bubble", bubbledata);

  // Create a gauge chart
  var gaugedata = [{}];

  // Get top 10 of sample values
  // var defaultsortedValues = defaultData.sort(
  //   (a, b) => b.sample_values - a.sample_values
  // );
  // console.log(defaultsampleData);

  // var sampleData = data.samples.map(item => item);
  // var sortedotuValues = sampleData.sort(
  //   (a, b) => b.sample_values - a.sample_values
  // );
  // var top10values = sortedotuValues.slice(0, 10);
  // console.log(sampleData);
  // console.log(sortedotuValues);
  // console.log(top10values);

  // Show demographic info
  var dropdownMenu = d3.select("#selDataset");
  var dropdownValue = dropdownMenu.property("value");

  // var id = [];
  // var sampleValues = [];
  // var otuValues = [];
  // var otuLabels = [];

  // console.log(testid);

  // for (var i = 0; i < data.names.length; i++) {
  //   // id.push(data.samples);
  //   sampleValues.push(data.samples.map(item => item.sample_values));
  //   otuValues.push(data.samples.map(item => item.otu_ids));
  //   //
  //   otuLabels.push(data.samples.map(item => item.otu_labels));
  // }

  // console.log(sampleValues);
  // console.log(otuValues);
  // // console.log(sortedotuValues);
});

d3.select("#selDataset").on("change", optionChanged);

function optionChanged() {
  var dropdownMenu = d3.select("#selDataset");
  var dropdownValue = dropdownMenu.property("value");
  console.log(`Currently test id ${dropdownValue} is shown on the page`);

  // Update graph
  Plotly.restyle("bar", "x", [x]);
  Plotly.restyle("bar", "x", [x]);
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

// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// Update all of the plots any time that a new sample is selected.
