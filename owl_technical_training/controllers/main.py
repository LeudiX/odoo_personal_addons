from odoo import http
from odoo.http import request


class MainController(http.Controller):
    @http.route("/tutorials", type="http", auth="user")
    def tutorials_index(self):
        return request.render("owl_technical_training.owl_base_template")
