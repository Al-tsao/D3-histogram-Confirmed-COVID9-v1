async function draw() {
  // Data
  const dataset = await d3.csv('test.csv')

  // Data Parse
  const parseData = d3.timeParse('%Y/%m/%d')
  const xAccessor = d => parseData(d.date)
  const yAccessor = d => parseInt(d.daily_confirmed)

  // Dimensions
  let dimensions = {
    width: 600,
    height: 400,
    margins: 50,
    padding: 1,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Ctr
  const svg = d3.select('#chart')
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const ctr = svg.append("g") // <g>
    .attr("width", dimensions.ctrWidth)
    .attr("height", dimensions.ctrHeight)
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const xScale = d3.scaleUtc()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])


  // Bars
  ctr.selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', d => {
      if (xScale(xAccessor(d)) === dimensions.ctrWidth) {
        return
      } else {
        let width = dimensions.ctrWidth / (dataset.length - 1)
        if (width > 1) {
          width = dimensions.ctrWidth / (dataset.length - 1) - dimensions.padding
        }
        return width
      }
    })
    .attr('x', d => {
      if (xScale(xAccessor(d)) === dimensions.ctrWidth) {
        return
      } else {
        return xScale(xAccessor(d))
      }
    })
}

draw()

