async function draw() {
  // Data
  const dataset = await d3.csv('COVID19.csv')

  // Data Parse
  const parseData = d3.timeParse('%Y/%m/%d')
  const xAccessor = d => parseData(d.date)

  // Dimensions
  let dimensions = {
    width: 800,
    height: 400,
    margins: 50
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Ctr
  const svg = d3.select('#chart')
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const ctr = svg.append("g") // <g>
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )


}

draw()

