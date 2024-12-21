import React from 'react'
import 'react-native'

import renderer from 'react-test-renderer'

import { it, expect } from '@jest/globals'

import PieChart from '../src/'

it('five slices', () => {
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 321, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = renderer.create(<PieChart widthAndHeight={250} series={series} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('zero in the series', () => {
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 0, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
    { value: 0, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = renderer.create(<PieChart widthAndHeight={250} series={series} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('small numbers', () => {
  const series = [
    { value: 1, color: '#fbd203' },
    { value: 0.5, color: '#ffb300' },
    { value: 0.5, color: '#ff9100' },
  ]

  const rendered = renderer.create(<PieChart widthAndHeight={250} series={series} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('big numbers', () => {
  const series = [
    { value: 999000, color: 'red' },
    { value: 100000, color: 'blue' },
    { value: 53000, color: '#000011' },
  ]

  const rendered = renderer.create(<PieChart widthAndHeight={250} series={series} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('small series', () => {
  const series = [{ value: 1, color: 'black' }]

  const rendered = renderer.create(<PieChart widthAndHeight={320} series={series} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('large series', () => {
  const series = [
    { value: 1, color: 'black' },
    { value: 2, color: 'red' },
    { value: 3, color: 'blue' },
    { value: 4, color: 'pink' },
    { value: 200, color: '#000000' },
    { value: 300, color: '#001100' },
    { value: 400, color: '#99ff00' },
    { value: 100, color: '#ffaabb' },
    { value: 1, color: 'white' },
    { value: 1, color: '#ffaabb' },
    { value: 1, color: '#987654' },
    { value: 1, color: 'black' },
    { value: 1, color: 'pink' },
  ]

  const rendered = renderer.create(<PieChart widthAndHeight={400} series={series} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('doughnut chart', () => {
  const series = [
    { value: 200, color: '#fbd203' },
    { value: 250, color: '#ffaabb' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = renderer.create(<PieChart widthAndHeight={400} series={series} cover={0.3} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('doughnut with cover chart', () => {
  const series = [
    { value: 200, color: '#fbd203' },
    { value: 250, color: '#ffaabb' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ]

  const rendered = renderer
    .create(<PieChart widthAndHeight={400} series={series} cover={{ radius: 0.3, color: '#3c3c3c' }} />)
    .toJSON()
  expect(rendered).toMatchSnapshot()
})

it('pad angle', () => {
  const series = [
    { value: 50, color: '#fbd203' },
    { value: 10, color: '#ffaabb' },
    { value: 20, color: '#ff6c00' },
    { value: 30, color: '#ff3c00' },
  ]

  const rendered = renderer.create(<PieChart widthAndHeight={400} series={series} padAngle={0.1} />).toJSON()
  expect(rendered).toMatchSnapshot()
})

it('check for negative in series', () => {
  const series = [
    { value: 430, color: '#fbd203' },
    { value: -120, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
  ]

  expect(() => renderer.create(<PieChart widthAndHeight={250} series={series} />)).toThrow(Error)
})

it('check for all zeros series', () => {
  const series = [
    { value: 0, color: '#fbd203' },
    { value: 0, color: '#ffb300' },
    { value: 0, color: '#ff9100' },
  ]

  expect(() => renderer.create(<PieChart widthAndHeight={250} series={series} />)).toThrow(Error)
})

it('check for back cover radius', () => {
  const series = [
    { value: 100, color: '#fbd203' },
    { value: 200, color: '#ffb300' },
    { value: 50, color: '#ff9100' },
  ]

  expect(() => renderer.create(<PieChart widthAndHeight={250} series={series} cover={1.1} />)).toThrow(Error)
  expect(() => renderer.create(<PieChart widthAndHeight={250} series={series} cover={-1} />)).toThrow(Error)
})

it('color is mandatory', () => {
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 123 },
    { value: 80, color: '#ff3c00' },
  ]

  expect(() => renderer.create(<PieChart widthAndHeight={250} series={series} />)).toThrow(Error)
})
