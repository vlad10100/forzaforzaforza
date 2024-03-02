import * as d3 from 'd3'
import { parseSplitsMetric } from '@/stores/strava/parsers'
import type { Splits } from '@/stores/strava/parsers'

export const createBarChart = (splitsMetric: Splits[]) => {
  const metrics = parseSplitsMetric(splitsMetric)
  const min: number = d3.min(metrics, (d) => d.average_pace) || 0
  const barHeight = 15
  const margin = { top: 10, right: 20, bottom: 10, left: 20 }

  const width = 320
  const height = Math.ceil((metrics.length + 0.1) * barHeight) + margin.top * 2.5 + margin.bottom

  const x = d3
    .scaleLinear()
    .domain([0, d3.min(metrics, (d) => d.average_pace) as number])
    .range([margin.left, width - margin.right * 6])

  const y = d3
    .scaleBand()
    .domain(metrics.map((d) => d.split) as [])
    .rangeRound([margin.top * 2, height - margin.bottom])
    .padding(0.1)

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr(
      'style',
      'max-width: 100%; height: auto; height: intrinsic; display: block; font: 10px sans-serif;'
    )

  // Append a rect to split distance
  // ea84c9, '#48bfe3'
  // bars
  svg
    .append('g')
    .attr('fill', '#48bfe3')
    .selectAll()
    .data(metrics)
    .join('rect')
    .attr('x', 70)
    .attr('y', (d: any) => y(d.split) as number)
    .attr('width', (d) => {
      let adjustedPace = min - (d.average_pace - min) * 1.8
      if (x(adjustedPace) - x(0) > 0) return x(adjustedPace) - x(0)
      return 10
    })
    .attr('height', y.bandwidth())

  // average pace column
  svg
    .append('g')
    .attr('fill', '#343a40')
    .attr('text-anchor', 'start')
    .selectAll()
    .data(metrics)
    .join('text')
    .attr('x', (d) => 35)
    .attr('y', (d: any) => (y(d.split) as number) + y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('dx', -4)
    .text((d) => d.parsed_average_pace)

  // average pace column
  svg
    .append('g')
    .attr('fill', '#343a40')
    .attr('text-anchor', 'start')
    .selectAll()
    .data(metrics)
    .join('text')
    .attr('x', (d) => 10)
    .attr('y', (d: any) => (y(d.split) as number) + y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('dx', -4)
    .text((d) => d.split)

  // elevation column
  svg
    .append('g')
    .attr('fill', '#343a40')
    .attr('text-anchor', 'end')
    .selectAll()
    .data(metrics)
    .join('text')
    .attr('x', (d) => width - margin.right * 1.5)
    .attr('y', (d: any) => (y(d.split) as number) + y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('dx', -4)
    .text((d) => d.elevation_difference)

  // hr column
  svg
    .append('g')
    .attr('fill', '#343a40')
    .attr('text-anchor', 'end')
    .selectAll()
    .data(metrics)
    .join('text')
    .attr('x', (d) => width)
    .attr('y', (d: any) => (y(d.split) as number) + y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('dx', -4)
    .text((d) => Math.round(d.average_heartrate))

  // header
  svg
    .append('line')
    .attr('x1', 5)
    .attr('y1', 20)
    .attr('x2', width - 5)
    .attr('y2', 20)
    .attr('stroke', '#343a40')
    .attr('stroke-width', 1)

  // header tags
  svg.append('text').attr('fill', '#343a40').join('text').text('KM').attr('x', 5).attr('y', 15)
  svg.append('text').attr('fill', '#343a40').join('text').text('PACE').attr('x', 30).attr('y', 15)
  svg
    .append('text')
    .attr('fill', '#343a40')
    .join('text')
    .text('ELEV')
    .attr('x', width - 60)
    .attr('y', 15)
  svg
    .append('text')
    .attr('fill', '#343a40')
    .join('text')
    .text('HR')
    .attr('x', width - 20)
    .attr('y', 15)

  return svg.node()
}
