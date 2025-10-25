/** @odoo-module **/
import { Component, onWillStart, useRef, onMounted } from "@odoo/owl";
import { loadJS, loadCSS } from "@web/core/assets"

export class LeafletMapRenderer extends Component {
    static template = "owl_leaflet_map.lmap_renderer"
    static props = {}

    setup() {
        this.root = useRef('map')

        onWillStart(async () => {
            try {
                await loadCSS("/owl_leaflet_map/static/lib/leaflet/leaflet.css");
                await loadJS("/owl_leaflet_map/static/lib/leaflet/leaflet.js")
                console.log("Leaflet assets loaded successfully");
            } catch (error) {
                console.error("Failed to load Leaflet assets:", error);
            }

            try {
                await loadCSS("/owl_leaflet_map/static/lib/leaflet-routing-machine-3.2.12/leaflet-routing-machine.css");
                await loadJS("/owl_leaflet_map/static/lib/leaflet-routing-machine-3.2.12/leaflet-routing-machine.js");
                console.log("Leaflet Routing Machine assets loaded successfully");
            } catch (error) {
                console.error("Failed to load Leaflet Routing Machine assets:", error);
            }
        })

        onMounted(() => {
            this.map = L.map(this.root.el).setView([23.1136, -82.3666], 13, { animate: true }); // Centered view in Havana Cuba

            // Add a tile layer (e.g., OpenStreetMap)
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            // Initialize the map
            const defaultMarker = L.marker([23.1136, -82.3666]).addTo(this.map);

            //marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br/><br/><button class='btn btn-primary'>Open</button>");


            // Variable to store the current marker
            let currentMarker = null;

            // Add click event listener to the map
            this.map.on('click', (e) => {
                // Remove the previous marker if it exists
                if (currentMarker) {
                    this.map.removeLayer(currentMarker);
                }
                // Create a marker at the clicked location
                currentMarker = L.marker(e.latlng).addTo(this.map)

                // Harcoded Leaflet Routing Machine routes calculation
                L.Routing.control({ 
                    waypoints: [ 
                       L.latLng(23.1136, -82.3666), 
                       L.latLng(22.995529,-82.400136)] 
                    }).addTo(this.map);

                //Add a popup to the marker with the coordinates
                currentMarker.bindPopup(`Coordinates: ${e.latlng.toString()}`).openPopup();

                // Add a click event listener to the marker to show the popup
                currentMarker.on('click', () => {
                    currentMarker.openPopup();
                });
            });
        })

    }
}