// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function createPlotly(data) {
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
  var index = testid.indexOf(dropdownValue);

  // Show demographic info
  d3.select("#testid").text(`ID: ${dropdownValue}`);
  d3.select("#ethnicity").text(`ethnicity: ${data.metadata[index].ethnicity}`);
  d3.select("#gender").text(`gender: ${data.metadata[index].gender}`);
  d3.select("#age").text(`age: ${data.metadata[index].age}`);
  d3.select("#location").text(`location: ${data.metadata[index].location}`);
  d3.select("#bbtype").text(`bbtype: ${data.metadata[index].bbtype}`);
  d3.select("#wfreq").text(`wfreq: ${data.metadata[index].wfreq}`);

  // Create a dynamic demographic info - issue is to get data.metadata[index].[value]
  // var demographicList = Object.keys(data.metadata[0]);
  // demographicList.forEach(function(p) {
  //   var sel = document.getElementById("sample-metadata");
  //   var item = document.createElement("p");
  //   item.id = p;
  //   item.appendChild(document.createTextNode(`${p}: ${data.metadata[index]}`));
  //   // d3.select(`"#${p}"`).text("test");
  //   // item.value = `${p}:${p}`;
  //   sel.appendChild(item);
  // });

  // Create a bar graph using index
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

  // Create a bubble chart
  var bubbledata = [
    {
      x: data.samples[index].otu_ids,
      y: data.samples[index].sample_values,
      mode: "markers",
      text: data.samples[index].otu_labels,
      marker: {
        size: data.samples[index].sample_values,
        color: data.samples[index].otu_ids
      }
    }
  ];

  var labels = {
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" }
  };

  Plotly.newPlot("bubble", bubbledata, labels);

  // Create a gauge chart
  // You will need to modify the example gauge code to account for values ranging from 0 through 9.
  var gaugedata = [
    {
      values: [
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50
      ],
      labels: [
        "0-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
        "5-6",
        "6-7",
        "7-8",
        "8-9",
        ""
      ],
      marker: {
        colors: [
          "rgba(14, 127, 0, .5)",
          "rgba(40, 127, 0, .5)",
          "rgba(110, 154, 22, .5)",
          "rgba(170, 202, 42, .5)",
          "rgba(202, 209, 95, .5)",
          "rgba(210, 206, 145, .5)",
          "rgba(232, 226, 202, .5)",
          "rgba(255, 255, 255, 0)",
          "rgba(255, 300, 255, 0)",
          "rgba(255, 300, 255, 0)"
        ]
      },

      hole: 0.5,
      type: "pie",
      direction: "clockwise",
      rotation: 90,
      text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
      textinfo: "text",
      textposition: "inside",
      hoverinfo: "none",
      showlegend: false
    }
  ];

  var layout = {
    width: 500,
    height: 500,
    title: "Belly Button Washing Frequency"
    // xaxis: { title: "scrubs per week" }
  };
  Plotly.newPlot("gauge", gaugedata, layout);

  // When different test ID is selected, call an function optionChanged
  d3.select("#selDataset").on("change", optionChanged);

  function optionChanged() {
    console.log("Different item was selected.");
    var dropdownMenu = d3.select("#selDataset");
    var dropdownValue = dropdownMenu.property("value");
    console.log(`Currently test id ${dropdownValue} is shown on the page`);

    // Update graph
    createPlotly(data);
  }
});
