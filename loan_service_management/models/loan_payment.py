# -*- coding: utf-8 -*-
import logging

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from datetime import date

_logger = logging.getLogger(__name__)
"""_Stores partial payments, linking each to a loan_
"""


class Loan_payment(models.Model):
    _name = "loan.payment"
    _description = "Loan Payment"
    _rec_name = "loan_id"

    loan_id = fields.Many2one(
        string=_("Loan"), comodel_name="loan.service", required=True
    )
    # Feature (Retrieve the partner_id.name from the related loan.service [Improves performance] )
    partner_id = fields.Many2one(
        string="Customer",
        related="loan_id.partner_id",
        store=True,
        readonly=True,
    )
    payment_date = fields.Date(
        string=_("Payment Date"),
        default=fields.Datetime.now,  # Question context_today vs now?
    )
    amount = fields.Float(string=_("Amount Paid"), required=True)
    payment_method = fields.Selection(
        string=_("Payment Method"),
        selection=[
            ("cash", "Cash"),
            ("bank_transfer", "Bank Transfer"),
            ("mobile_payment", "Mobile Payment"),
        ],
        required=True,
    )

    @api.onchange("amount")
    def _onchange_amount(self):
        """Warns the user if they enter a payment greater than remaining debt before saving."""
        if self.loan_id and self.amount > self.loan_id.remaining_debt:
            return {
                "warning": {
                    "title": "Invalid Payment",
                    "message": (
                        f"The amount {self.amount} is greater than your remaining debt {self.loan_id.remaining_debt}."
                    ),
                    "type": "alert",
                }
            }
    
    @api.constrains("amount")
    def _check_amount_before_paid(self):
        """Final validation to prevent saving if the amount exceeds the remaining debt."""
        for record in self:
            if record.loan_id and record.amount > record.loan_id.remaining_debt:
                raise ValidationError(
                    f"The amount {record.amount} cannot be greater than the remaining debt {record.loan_id.remaining_debt}."
                )

    @api.model_create_multi
    def create(self, vals):
        record = super().create(vals)
        record.loan_id._compute_remaining_debt()
        return record

    @api.onchange("loan_id")
    def _onchange_loan_id(self):
        """_Warn users if they haven't made a payment close to a month_"""
        if self.loan_id:
            last_payment = self.env["loan.payment"].search(
                [("loan_id", "=", self.loan_id.id)],
                order="payment_date desc",
                limit=1,
            )
            today = date.today()
            suggested_payment = self.loan_id.suggested_monthly_payment
            days_since_last_payment = (
                (today - last_payment.payment_date).days
                if last_payment
                else (today - self.loan_id.date_of_application).days
            )

            if days_since_last_payment >= 25:  # Warning appears 5 days before 1 month
                return {
                    "warning": {
                        "title": "Payment Reminder ⚠️",
                        "message": (
                            f"It's been almost a month since your last payment.\n"
                            f"To avoid delay, consider paying at least {suggested_payment:.2f}."
                        ),
                        "type": "alert",  # Odoo’s Bootstrap alert style
                    }
                }
