# -*- coding: utf-8 -*-
import logging
from dateutil.relativedelta import relativedelta
from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class EstatePropertyOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Property Offer"
    _order = "price desc"
    _sql_constraints = [
        ("check_price", "CHECK(price > 0)", "The price must be strictly positive"),
    ]

    # Basic
    price = fields.Float(string=_("Price"))
    status = fields.Selection(
        string=_("Status"),
        selection=[
            ("accepted", "Accepted"),
            ("refused", "Refused"),
        ],
        copy=False,
    )

    # Relational
    partner_id = fields.Many2one(
        string=_("Partner"), comodel_name="res.partner", required=True
    )
    property_id = fields.Many2one(
        string=_("Property"), comodel_name="estate.property", required=True
    )

    # Computed
    validity_days = fields.Integer(string=_("Validity (days)"), default=7)
    date_deadline = fields.Date(
        compute="_compute_date_deadline",
        inverse="_inverse_date_deadline",
        string="Deadline",
    )

    @api.depends("create_date", "validity_days")
    def _compute_date_deadline(self):
        for rec in self:
            date = rec.create_date.date() if rec.create_date else fields.Date.today()
            rec.date_deadline = date + relativedelta(days=rec.validity_days)

    def _inverse_date_deadline(self):
        for rec in self:
            date = rec.create_date.date() if rec.create_date else fields.Date.today()
            rec.validity_days = (rec.date_deadline - date).days

    # Actions

    def action_accept_offer(self):
        if "accepted" in self.mapped("property_id.offer_ids.status"):
            raise UserError("An offer has already been accepted.")
        self.write({"status": "accepted"})
        return self.mapped("property_id").write(
            {
                "state": "offer_accepted",
                "selling_price": self.price,
                "buyer_id": self.partner_id.id,
            }
        )

    def action_refuse_offer(self):
        return self.write({"status": "refused"})
