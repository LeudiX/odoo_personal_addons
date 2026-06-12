/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";

export class TicketSearch extends Component {
  static template = "pyxel_tcm_website.ticket_search";

  setup() {
    this.state = useState({
      ticketNumber: "",
      validationMessage: "",
      isValid: false,
      loading: false,
      result: null, // { found, ticket, status, title, create_date }
      error: null,
    });

    this.rpc = rpc;
    this.notification = useService("notification");

    // Regex for format SOL04/2026_001 (month=04, year=2026, number=001)
    this.ticketRegex = /^SOL(0[1-9]|1[0-2])\/\d{4}_\d{3}$/;
  }

  validateTicketNumber(value) {
    if (!value) {
      this.state.validationMessage = "";
      this.state.isValid = false;
      return;
    }
    if (this.ticketRegex.test(value)) {
      this.state.validationMessage = "✅ Formato de ticket válido";
      this.state.isValid = true;
    } else {
      this.state.validationMessage =
        "❌ Formato no válido. Se esperaba: SOL04/2026_001";
      this.state.isValid = false;
    }
  }

  onInput(ev) {
    this.state.ticketNumber = ev.target.value;
    this.validateTicketNumber(this.state.ticketNumber);
    // Clear previous results when user starts typing
    if (this.state.result) {
      this.state.result = null;
      this.state.error = null;
    }
  }

  async onCheck() {
    if (!this.state.ticketNumber.trim()) {
      this.notification.add("Por favor, introduzca un no. de ticket", {
        title: "Información faltante",
        type: "warning",
      });
      return;
    }

    if (!this.state.isValid) {
      this.notification.add(
        "El formato del no. de ticket no es válido. Utilice un formato como SOL04/2026_001.",
        {
          title: "Error de validación",
          type: "danger",
        },
      );
      return;
    }

    this.state.loading = true;
    this.state.result = null;
    this.state.error = null;

    try {
      const result = await this.rpc("/api/ticket/search", {
        ticket_number: this.state.ticketNumber,
      });

      if (result.found) {
        this.state.result = result;
        this.notification.add(
        "Enhorabuena. Su ticket ha sido encontrado en el sistema.",
        {
          title: "Ticket encontrado",
          type: "success",
        },
      );
      } else {
        this.state.error = result.ticket;
        this.notification.add(
          `Estimado cliente, el no. de ticket (${result.ticket}) introducido no está en nuestro sistema. Por favor, verifique la información e inténtelo de nuevo. Si el problema persiste, póngase en contacto con nuestro equipo de soporte.`,
          { title: "Ticket no encontrado", type: "danger"},
        );
      }
    } catch (error) {
      console.error("RPC error:", error);
      this.notification.add(
        "Se ha producido un error durante la búsqueda. Inténtalo de nuevo más tarde.",
        {
          title: "Error de servidor",
          type: "danger",
        },
      );
    } finally {
      this.state.loading = false;
    }
  }
}
registry
  .category("public_components")
  .add("pyxel_tcm_website.TicketSearch", TicketSearch);
