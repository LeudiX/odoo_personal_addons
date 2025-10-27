/** @odoo-module **/
import { registry } from "@web/core/registry";
import { RouterComponent } from "../components/router_component";

// Mount BaseComponent on the main app template
registry.category("public_components").add("owl_technical_training.RouterComponent", RouterComponent)
