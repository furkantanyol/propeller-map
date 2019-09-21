import { getContainerSize } from './helpers'

it('gets the container size of the tiles for all zoom levels', () => {
  let size = 256
  let zoomLevel = 0
  expect(getContainerSize(size, zoomLevel)).toBe(256)
  zoomLevel = 1
  expect(getContainerSize(size, zoomLevel)).toBe(512)
  zoomLevel = 2
  expect(getContainerSize(size, zoomLevel)).toBe(1024)
  zoomLevel = 3
  expect(getContainerSize(size, zoomLevel)).toBe(2048)
})
