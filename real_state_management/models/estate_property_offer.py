# -*- coding: utf-8 -*-
import logging

from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class EstatePropertyOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Property Offer"

    price = fields.Float(string=_("Price"))
    status = fields.Selection(
        string=_("Status"),
        selection=[
            ("accepted", "Accepted"),
            ("refused", "Refused"),
        ],
        copy=False,
    )
    partner_id = fields.Many2one(
        string=_("Partner"), comodel_name="res.partner", required=True
    )
    property_id = fields.Many2one(
        string=_("Property"), comodel_name="estate.property", required=True
    )
