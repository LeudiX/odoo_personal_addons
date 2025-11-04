from odoo import http
from odoo.http import request
from werkzeug.exceptions import NotFound

# Import apps registry (as a Python dict for validation)
REGISTRY_IDS = [
    "standalone_app",
    "counter_app",
    "reactive_form_app",
    "persistent_form_app",
    "qr_generator_app",
    "todo_app",
]  # Keep in sync with JS


class MainController(http.Controller):
    @http.route(
        ["/tutorials", "/tutorials/<string:appId>"],
        type="http",
        auth="public",
        website=True,
        sitemap=True,
    )
    def tutorials_index(self, appId=None, **kw):
        if appId and appId not in REGISTRY_IDS:
            raise NotFound()
        return request.render(
            "owl_technical_training.owl_generic_template", {"appId": appId}
        )
