Plotly.d3.json("/names", function(error, names) {
                for (var i = 0; i < names.length; i++) {
                    d3.select("#selDataset").append("option").attr("value", `${names[i]}`).text(`${names[i]}`)
                }
            });

    Plotly.d3.json("/metadata/BB_940", function(error, response) {
        d3.select("#sample-metadata").append("li").text(`AGE: ${response.AGE}`)
        d3.select("#sample-metadata").append("li").text(`BBTYPE: ${response.BBTYPE}`)
        d3.select("#sample-metadata").append("li").text(`ETHNICITY: ${response.ETHNICITY}`)
        d3.select("#sample-metadata").append("li").text(`LOCATION: ${response.LOCATION}`)
        d3.select("#sample-metadata").append("li").text(`SAMPLEID: ${response.SAMPLEID}`)
    })

    function optionChanged(sel) {
        console.log(sel);
        d3.selectAll("li").remove();
        Plotly.d3.json(`/metadata/${sel}`, function(error, response) {
        d3.select("#sample-metadata").append("li").text(`AGE: ${response.AGE}`)
        d3.select("#sample-metadata").append("li").text(`BBTYPE: ${response.BBTYPE}`)
        d3.select("#sample-metadata").append("li").text(`ETHNICITY: ${response.ETHNICITY}`)
        d3.select("#sample-metadata").append("li").text(`LOCATION: ${response.LOCATION}`)
        d3.select("#sample-metadata").append("li").text(`SAMPLEID: ${response.SAMPLEID}`)
    })
        Plotly.d3.json(`/samples/${sel}`, function(error, response) {
        if (error) return console.warn(error);
            pie_values = []
            pie_labels = []
            scatter_sizes = []
            scatter_x = response.otu_ids
            scatter_y = response.sample_values
            otu_desc = []
            trace1_text = []
            trace2_text = []
            i = 0
            while (i < 10) {
                pie_values.push(response.sample_values[i]);
                pie_labels.push(response.otu_ids[i]);
                i++
            }
            for (i = 0; i < response.sample_values.length; i++) {
                scatter_sizes.push(Math.sqrt(response.sample_values[i]))
            }
            Plotly.d3.json("/otu", function(error, response) {
                for (i = 0; i < response.length; i ++) {
                otu_desc.push(response[i])
            }
        for (i = 0; i < pie_labels.length; i++) {
            trace1_text.push(otu_desc[pie_labels[i] - 1])
        }
        for (i = 0; i < scatter_x.length; i++) {
            trace2_text.push(otu_desc[scatter_x[i] - 1])
        }
        var trace1 = {
            labels: pie_labels,
            values: pie_values,
            text: trace1_text,
            textinfo: 'percent',
            hoverinfo: 'all',
            type: 'pie',
        };

        var trace2 = {
            x: scatter_x,
            y: scatter_y,
            mode: "markers",
            text: trace2_text,
            hoverinfo: "x+y+text",
            marker: {
                size: scatter_sizes,
                color: scatter_x,
                colorscale: 'YIGnBu'
            },
            type: "scatter"
        }

        updatePiePlot(trace1)
        updateBubblePlot(trace2)    
        })
        })
        Plotly.d3.json(`/wfreq/${sel}`, function(error, response) {

// Enter a speed between 0 and 180
var level = response;

// Trig to calc meter point
var degrees = 180 - (level * 20),
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'washes',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3',
            '1-2', '0-1', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(65, 140, 11, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(186, 205, 68, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(221, 216, 173, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Belly Button Washings per Week',
  height: 500,
  width: 500,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
})
    }

    Plotly.d3.json("/samples/BB_940", function(error, response) {
        if (error) return console.warn(error);
            pie_values = []
            pie_labels = []
            scatter_sizes = []
            scatter_x = response.otu_ids
            scatter_y = response.sample_values
            otu_desc = []
            trace1_text = []
            trace2_text = []
            i = 0
            while (i < 10) {
                pie_values.push(response.sample_values[i]);
                pie_labels.push(response.otu_ids[i]);
                i++
            }
            for (i = 0; i < response.sample_values.length; i++) {
                scatter_sizes.push(Math.sqrt(response.sample_values[i]))
            }
            Plotly.d3.json("/otu", function(error, response) {
                for (i = 0; i < response.length; i ++) {
                otu_desc.push(response[i])
            }
        for (i = 0; i < pie_labels.length; i++) {
            trace1_text.push(otu_desc[pie_labels[i] - 1])
        }
        for (i = 0; i < scatter_x.length; i++) {
            trace2_text.push(otu_desc[scatter_x[i] - 1])
        }
        var trace1 = {
            labels: pie_labels,
            values: pie_values,
            text: trace1_text,
            textinfo: 'percent',
            hoverinfo: 'all',
            type: 'pie',
        };

        var trace2 = {
            x: scatter_x,
            y: scatter_y,
            mode: "markers",
            text: trace2_text,
            hoverinfo: "x+y+text",
            marker: {
                size: scatter_sizes,
                color: scatter_x,
                colorscale: 'YIGnBu'
            },
            type: "scatter"
        }

        var pie_data = [trace1];
        var bubble_data = [trace2];
        Plotly.newPlot("pie", pie_data);
        Plotly.newPlot("bubble", bubble_data);
        })
    })

Plotly.d3.json("/wfreq/BB_940", function(error, response) {

// Enter a speed between 0 and 180
var level = response;

// Trig to calc meter point
var degrees = 180 - (level * 20),
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'washes',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3',
            '1-2', '0-1', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(65, 140, 11, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(186, 205, 68, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(221, 216, 173, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Belly Button Washings per Week',
  height: 500,
  width: 500,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
})

        function updatePiePlot(newdata) {
            var Pie = document.getElementById('pie');
            Plotly.restyle(Pie, 'values', [newdata.values])
            Plotly.restyle(Pie, 'labels', [newdata.labels])
            Plotly.restyle(Pie, 'text', [newdata.text])
        }

        function updateBubblePlot(newdata) {
            var Bubble = document.getElementById('bubble');
            Plotly.restyle(Bubble, 'x', [newdata.x])
            Plotly.restyle(Bubble, 'y', [newdata.y])
            Plotly.restyle(Bubble, 'text', [newdata.text])
            Plotly.restyle(Bubble, 'marker.color', [newdata.marker.color])
            Plotly.restyle(Bubble, 'marker.size', [newdata.marker.size])
        }
