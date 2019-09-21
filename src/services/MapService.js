class MapService {
  fetchZoomLevels = async folderSrc => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ folderSrc })
    }
    try {
      const fetchResponse = await fetch(`/tiles_enum`, settings)
      const { zoomLevels } = await fetchResponse.json()
      return zoomLevels
    } catch (e) {
      return e
    }
  }
}

const MapServiceInstance = new MapService()

export default MapServiceInstance
