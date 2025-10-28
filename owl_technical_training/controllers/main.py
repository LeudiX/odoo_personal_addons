from odoo import http
from odoo.http import request


class MainController(http.Controller):
    @http.route("/tutorials", type="http", auth="user", website=True, sitemap=True)
    def tutorials_index(self, **kw):
        return request.render("owl_technical_training.owl_tutorial_template")
