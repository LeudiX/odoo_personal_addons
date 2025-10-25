/** @odoo-module **/

import { registry } from "@web/core/registry";
import { standardViewProps } from "@web/views/standard_view_props";
import { Component } from "@odoo/owl";
import { LeafletMapRenderer } from "./lmap_renderer";
import {Layout} from "@web/search/layout"

export class LeafletMapController extends Component {
    static template = "owl_leaflet_map.lmap_view";
    static components = {LeafletMapRenderer, Layout};
    static props = {
        ...standardViewProps,
    };
    setup() {
      console.log(this)
    }
}

const lmapView = {
  type:"lmap",
  display_name: 'Leaflet Map',
  icon: "fa fa-map-marker",
  multiRecord:true,
  Controller: LeafletMapController,
  extractProps: ({ attrs }) => ({
    name: attrs.name,
  }),
};

registry.category("views").add("lmap", lmapView);
