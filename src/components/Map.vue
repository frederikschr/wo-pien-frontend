<template>
  <div id="map"></div>

</template>

<script>
import { Map, TileLayer, Marker } from 'leaflet'

export default {
  name: 'Map',
  props: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  mounted () {
    const map = new Map('map', { center: [this.lat, this.lng], zoom: 12, minZoom: 8 })

    const layer = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    map.addLayer(layer)

    const marker = new Marker([this.lat, this.lng])
    marker.addTo(map)
    marker.bindPopup('Piener Location').openPopup()
  }
}

</script>

<style>
#map {
  width: 100%;
  height: 40vh;
}

</style>
