# -*- coding: utf-8 -*-
import logging

from odoo import models, fields
# from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class UIView(models.Model):
    _inherit = 'ir.ui.view'

    type = fields.Selection(
        selection_add=[
            ('lmap', 'Leaflet Map'),
        ],
    )