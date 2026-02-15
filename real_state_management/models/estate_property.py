# -*- coding: utf-8 -*-
import logging
from dateutil.relativedelta import relativedelta
from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError


_logger = logging.getLogger(__name__)


class EstateProperty(models.Model):
    _name = "estate.property"
    _description = "Estate Property"
    _inherit = ["mail.thread", "mail.activity.mixin"]

    # Basic
    name = fields.Char("Title", required=True)
    description = fields.Text(string=_("Description"))
    postcode = fields.Char(string=_("Postcode"))
    availability_date = fields.Date(
        string=_("Available From"),
        default=lambda self: self._default_availability_date(),
        copy=False,
    )
    expected_price = fields.Float(string=_("Expected Price"), required=True)
    selling_price = fields.Float(string=_("Selling Price"), readonly=True, copy=False)
    bedrooms = fields.Integer(string=_("Bedrooms"), default=2)
    living_area = fields.Integer(string=_("Living Area (sqm)"))
    facades = fields.Integer(string=_("Facades"))
    garage = fields.Boolean(string=_("Garage"), default=True)
    garden = fields.Boolean(string=_("Garden"), default=True)
    garden_area = fields.Integer(string=_("Garden Area"))
    garden_orientation = fields.Selection(
        string=_("Garden Orientation"),
        selection=[
            ("N", "North"),
            ("S", "South"),
            ("E", "East"),
            ("W", "West"),
        ],
        help="Orientation of the garden",
    )

    # Special
    active = fields.Boolean(
        string=_("Active"), default=True
    )  # Manages records appearance on the list views
    state = fields.Selection(
        string=_("Status"),
        selection=[
            ("new", "New"),
            ("offer_received", "Offer Received"),
            ("offer_accepted", "Offer Accepted"),
            ("sold", "Sold"),
            ("canceled", "Canceled"),
        ],
        required=True,
        default="new",
        copy=False,
    )

    def _default_availability_date(self):
        return fields.Date.context_today(self) + relativedelta(months=3)
