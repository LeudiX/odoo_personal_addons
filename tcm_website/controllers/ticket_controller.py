from odoo.http import Controller, request, route


class TicketController(Controller):
    @route("/ticket/search", type="http", auth="public", website=True, methods=["GET"])
    def get_ticket_search_page(self):
        """Renderiza la página de búsquedas basadas en el ticket."""
        return request.render("pyxel_tcm_website.ticket_search_page", {})

    @route("/api/ticket/search", methods=["POST"], type="jsonrpc", auth="public", csrf=False)
    def search_ticket(self, **kwargs):
        """Endpoint JSON para buscar un ticket dado su código en CRM lead."""
        ticket_number = kwargs.get("ticket_number", "")
        if not ticket_number:
            return {"error": "No se proporcionó el no. de ticket!!"}
        lead = (
            request.env["crm.lead"]
            .sudo()
            .search([("lead_ticket", "=", ticket_number.strip())], limit=1)
        )
        if lead:
            return {
                "found": True,
                "ticket": lead.lead_ticket,
                "status": lead.stage_id.name or "Sin etapa",
                "title": lead.name,
                "create_date": (
                    lead.create_date.strftime("%Y-%m-%d") if lead.create_date else ""
                ),
            }
        else:
            return {
                "found": False,
                "ticket": ticket_number,
            }
