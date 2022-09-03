import { useEffect } from "react";
import './Scatter.css';
import * as d3 from 'd3';

const Scatter = ({data, width, height, padding}) => {

    useEffect(()=> {
        scatterPlot();
    })

    const scatterPlot = () => {
        const tooltip = d3.select('#tooltip')
                            .style('visibility', 'hidden')
        
        const timeFormat = d3.timeFormat('%M:%S')
        
        const maxDate = d3.max(data, d => d.Year + 1)
        const minDate = d3.min(data, d => d.Year - 1)

        const minTime = d3.min(data, item => new Date(item.Seconds) * 1000)
        const maxTime = d3.max(data, item => new Date(item.Seconds) * 1000)

        const yScale = d3.scaleTime().domain([minTime, maxTime]).range([padding, height - padding])
        const xScale = d3.scaleLinear().domain([minDate, maxDate]).range([padding, width - padding])

        const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))

        d3.select('svg').append('g').call(xAxis).attr('id', 'x-axis')
            .attr('transform', 'translate(0,' + (height - padding) + ')')
        
        d3.select('svg').append('g').call(yAxis).attr('id', 'y-axis')
            .attr('transform', 'translate(' + padding + ',0)')

        d3.select('svg')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', 5)
            .attr('data-xvalue', (item) => item.Year )
            .attr('data-yvalue', (item) => new Date(item.Seconds * 1000))
            .attr('cx', (item) => xScale(item.Year))
            .attr('cy', (item) => yScale(new Date(item.Seconds * 1000)))
            .style('fill', item => item.Doping === '' ? '#FFD124' : '#00AFC1')
            .on('mouseover', (e, item) => {
                tooltip
                    .style('visibility', 'visible')
                    .html(`${item.Name}: ${item.Nationality} <br /> 
                            Year: ${item.Year}, Time: ${item.Time} <br />
                            <br /> ${item.Doping} `)
                    .style('left', (e.pageX + 10) + 'px')
                    .style('top', (e.pageY + 10) + 'px')
                    .attr('data-year', item.Year)
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden')
            })
    }


    return (
            <svg width={width} height={height} ></svg>
    )
}

export default Scatter;