# -*- coding: utf-8 -*-
"""_This model tracks tool check-ins, check-outs, and transfers._
"""

import logging

from odoo import models, fields, api
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


class InventoryMovement(models.Model):
    _name = 'inventory.movement'
    _description = 'InventoryMovement'

    name = fields.Char(
        string='Movement code',
        default=lambda self: self.env['ir.sequence']
        .next_by_code('inventory.movement'),
        readonly=True)
    tool_id = fields.Many2one(
        string='Tool',
        comodel_name='tool.inventory',
        required=True
    )
    movement_date = fields.Datetime(
        string='Movement Date',
        default=fields.Datetime.now,
        required=True
    )
    quantity = fields.Integer(string=('Quantity'), required=True)
    movement_type = fields.Selection(
        string='Movement Type',
        selection=[
            ('check_in', 'Check-In'),
            ('check_out', 'Check-Out'),
        ],
        required=True
    )
    source_location_id = fields.Many2one(
        string='Source Location',
        comodel_name='stock.location',
    )
    destination_location_id = fields.Many2one(
        string='Destination Location',
        comodel_name='stock.location',
    )
    responsible_user_id = fields.Many2one(
        string='Responsible User',
        comodel_name='res.users',
        default=lambda self: self.env.user
    )

    @api.constrains('quantity')
    def _check_quantity(self):
        for record in self:
            if record.quantity <= 0:
                raise ValidationError(
                    "Quantity must be greater than zero.")

    @api.model
    def create(self, vals):
        tool = self.env['tool.inventory'].browse(vals['tool_id'])
        quantity_exceeded = tool.quantity < vals['quantity']
        # Prevent check-out if not enough stock
        if vals['movement_type'] == 'check_out' and quantity_exceeded:
            raise ValidationError(
                f"Not enough stock for {tool.tool_name}!")
        # Reduce stock for check-out
        if vals['movement_type'] == 'check_out':
            tool.quantity -= vals['quantity']
        # Increase stock for check-in
        if vals['movement_type'] == 'check_in':
            tool.quantity += vals['quantity']
        # Enforce minimum stock alert logic
        tool._check_stock_levels()
        return super().create(vals)
