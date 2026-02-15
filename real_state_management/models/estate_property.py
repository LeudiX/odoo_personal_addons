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

    # Relational
    property_type_id = fields.Many2one("estate.property.type", string="Property Type")
    buyer_id = fields.Many2one("res.partner", string="Buyer", copy=False)
    salesperson_id = fields.Many2one(
        "res.users", string="Salesman", default=lambda self: self.env.user
    )
    tag_ids = fields.Many2many("estate.property.tag", string="Tags")
    offer_ids = fields.One2many("estate.property.offer", "property_id", string="Offers")

    # Computed
    total_area = fields.Integer(
        compute="_compute_total_area",
        help="Total area computed by summing the living area and the garden area",
        string="Total Area (sqm)",
    )
    best_price = fields.Float(
        string="Best Offer",
        help="Best offer received",
        compute="_compute_best_price",
    )
    best_bidder_id = fields.Many2one(
        "res.partner", string="Best Bidder", compute="_compute_best_bidder"
    )

    @api.depends("offer_ids.price")
    def _compute_best_price(self):
        for rec in self:
            rec.best_price = (
                max(rec.offer_ids.mapped("price")) if rec.offer_ids else 0.0
            )

    @api.depends("offer_ids.price")
    def _compute_best_bidder(self):
        for rec in self:
            rec.best_bidder_id = (
                # Finding who made the best offer
                max(rec.offer_ids, key=lambda o: o.price).partner_id
                if rec.offer_ids
                else "No offers yet"
            )

    @api.depends("living_area", "garden", "garden_area")
    def _compute_total_area(self):
        for rec in self:
            rec.total_area = (
                rec.living_area if not rec.garden else rec.living_area + rec.garden_area
            )

    def _default_availability_date(self):
        return fields.Date.context_today(self) + relativedelta(months=3)
