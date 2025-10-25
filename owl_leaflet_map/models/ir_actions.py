# -*- coding: utf-8 -*-
import logging

from odoo import models, fields
# from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class WindowActionUIView(models.Model):
    _inherit = "ir.actions.act_window.view"

    view_mode = fields.Selection(
        selection_add=[
            ("lmap", "Leaflet Map"),
        ],
        ondelete={"lmap": "cascade"},
    )
