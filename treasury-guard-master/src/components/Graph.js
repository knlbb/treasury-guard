import React from 'react'

import {
    // main component
    Chart,
    // graphs
    Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
    // wrappers
    Layer, Animate, Transform, Handlers,
    // helpers
    DropShadow, Gradient
  } from 'rumble-charts';

export default function Graph() {
  return (
    <Chart
  series={[
    {
      data: [
        10,
        11,
        12,
        13,
        12,
        12,
        15
      ]
    }
  ]}
  viewBox="0 0 300 150"
>
  <Handlers
    distance="x"
    onMouseLeave={function noRefCheck(){}}
    onMouseMove={function noRefCheck(){}}
  >
    <Layer
      height="68%"
      position="middle center"
      width="100%"
    >
      {/* <Bars
        barAttributes={{
          stroke: '#f5f5f6',
          strokeLinejoin: 'round',
          strokeWidth: 21,
          transform: 'translate(0 12)'
        }}
        barWidth="0%"
        colors={[
          '#03a9f4'
        ]}
        groupPadding="1%"
        innerPadding="0%"
      /> */}
      <Lines
        colors={[
          '#007696'
        ]}
        interpolation="cardinal"
        lineAttributes={{
          strokeLinecap: 'round',
          strokeWidth: 5
        }}
        lineWidth={0}
      />
      <Dots
        className="dots"
        colors={[
          '#007696'
        ]}
        dotStyle={{
          fillOpacity: 0,
          transition: 'all 250ms'
        }}
      />
      <Ticks
        axis="x"
        labelAttributes={{
          y: '2.5em'
        }}
        labelStyle={{
          dominantBaseline: 'text-after-edge',
          fill: '#000',
          fontFamily: 'Rubik', 
          fontSize: 6,
          fontWeight: 'normal',
          textAnchor: 'middle'
        }}
        ticks={[
          {
            label: '14 JUL',
            x: 0
          },
          {
            label: '15 JUL',
            x: 1
          },
          {
            label: '16 JUL',
            x: 2
          },
          {
            label: '17 JUL',
            x: 3
          },
          {
            label: '18 JUL',
            x: 4
          },
          {
            label: '19 JUL',
            x: 5
          },
          {
            label: '20 JUL',
            x: 6
          }
        ]}
      />
    </Layer>
  </Handlers>
</Chart>
  )
}
