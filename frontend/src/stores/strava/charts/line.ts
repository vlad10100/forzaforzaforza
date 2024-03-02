import * as d3 from 'd3'
import { parseLineData } from '@/stores/strava/parsers'
import type { Lap } from '@/stores/strava/parsers'

type AverageMetric = {
  label: string
  value: number
}

export const createLineChart = (
  lapsMetric: Lap[],
  distance: number[],
  metric: string,
  averageMetric?: AverageMetric
) => {
  const metrics: [number, number][] = parseLineData(lapsMetric, metric)
  const margin = { top: 20, right: 40, bottom: 20, left: 40 }

  const width = 320
  const height = 200

  const x = d3
    .scaleBand()
    .domain(d3.range(metrics.length) as [])
    .range([margin.left, width - margin.right / 2])

  const x2 = d3
    .scaleBand()
    .domain(d3.range(distance.length) as [])
    .range([margin.left, width - margin.right])

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(metrics, (d) => d[0]) as number])
    .range([height - margin.bottom, margin.top])

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')

  const line = d3
    .line()
    .x((d, i) => x(i as any) as number) // index
    .y((d: any) => y(d[0]) as number)

  const generatedLine = line(metrics as any)

  const area = d3
    .area()
    .x((d, i) => x(i as any) as number)
    .y0(200)
    .y1((d) => y(d[0]))

  svg
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('d', generatedLine)

  if (averageMetric) {
    // average line
    // svg
    //   .append('line')
    //   .attr('x1', margin.left)
    //   .attr('y1', y(averageMetric.value))
    //   .attr('x2', width - margin.right)
    //   .attr('y2', y(averageMetric.value))
    //   .attr('stroke', 'black')
    //   .attr('stroke-width', 1)
    //   .attr('stroke-dasharray', '10,10')
    // svg
    //   .append('text')
    //   .attr('x', width - margin.right)
    //   .attr('y', y(averageMetric.value) + 3)
    //   .attr('text-anchor', 'left')
    //   .text(averageMetric.label)
    //   .attr('fill', 'black')
    //   .style('font-size', '9px')
  }

  // Y axis
  svg
    .append('g')
    .attr('transform', 'translate(40, 0)')
    .call(d3.axisLeft(y).ticks(height / 50))
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - 60)
        .attr('stroke-opacity', 0.1)
    )
  // .call((g) =>
  //   g
  //     .append('text')
  //     .attr('x', -20)
  //     .attr('y', 10)
  //     .attr('fill', 'currentColor')
  //     .attr('text-anchor', 'start')
  //     .text(`↑ ${metric}`)
  // )

  // X axis
  // svg
  //   .append('g')
  //   .selectAll('line')
  //   .data(distance.map((item) => x2(item)))
  //   .enter()
  //   .append('line')
  //   .attr('x1', (d) => d)
  //   .attr('y1', margin.top)
  //   .attr('x2', (d) => d)
  //   .attr('y2', height - margin.bottom)
  //   .attr('stroke', 'lightgray')
  //   .attr('stroke-width', 1)

  const linearGradient = svg
    .append('defs')
    .append('linearGradient') // linear gradient
    .attr('id', 'liniear-gradient')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '90%')
  linearGradient
    .append('stop')
    .attr('offset', '0%')
    .style('stop-color', '#48bfe3')
    .style('stop-opacity', 0.4)
  linearGradient
    .append('stop')
    .attr('offset', '100%')
    .style('stop-color', '#48bfe3')
    .style('stop-opacity', 0.01)

  svg
    .append('path')
    .style('fill', 'url(#liniear-gradient)')
    .style('stroke', 'none')
    .attr('d', area(metrics))
  return svg.node()
}
