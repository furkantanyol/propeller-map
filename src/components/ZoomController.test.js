import React from 'react'
import ZoomController from './ZoomController'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const component = renderer.create(
    <ZoomController
      onZoomOut={jest.fn(() => undefined)}
      onZoomIn={jest.fn(() => undefined)}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
