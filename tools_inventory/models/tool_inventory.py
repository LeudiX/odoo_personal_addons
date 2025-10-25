# -*- coding: utf-8 -*-
import logging

from odoo import models, fields, api
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


class ToolInventory(models.Model):
    _name = 'tool.inventory'
    _description = 'ToolInventory'
    # For Odoo to display tool_name instead of the ID
    _rec_name = 'tool_name'

    tool_name = fields.Char(string=("Tool Name"), required=True)
    tool_code = fields.Char(
        string=("Tool code"),
        default=lambda self: self.env['ir.sequence']
        .next_by_code('tool.inventory'), readonly=True)
    category_id = fields.Many2one(
        string='Category',
        comodel_name='tool.category',
    )
    company_id = fields.Many2one(
        string='Company',
        comodel_name='res.company',
        required=True,
        default=lambda self: self.env.company
    )
    quantity = fields.Integer(string=('Stock Quantity'), default=0)
    min_quantity = fields.Integer(
        string='Minimun Quantity', default=5,
        help="Minimun stock before alert"
    )
    is_slow_stock = fields.Boolean(
        string=('Low Stock'),
        compute='_compute_is_low_stock', store=True
    )
    location_id = fields.Many2one(
        string='Location',
        comodel_name='stock.location',
    )
    maintenance_date = fields.Date(
        string='Next Maintenance Date',
    )
    is_active = fields.Boolean(string='Active', default=True)

    @api.depends('quantity', 'min_quantity')
    def _compute_is_low_stock(self):
        for record in self:
            record.is_slow_stock = record.quantity < record.min_quantity

    """_Raises:_
    models.ValidationError: _Warning stock alerts when quantity < min_quantity
    """
    @api.constrains('quantity', 'min_quantity')
    def _check_stock_levels(self):
        for record in self:
            if record.quantity < record.min_quantity:
                raise ValidationError(
                    f"Warning: Stock for {record.tool_name}"
                    "is below the minimum"
                    )

    """_Notify the user with a low stock alert when minimun stock is overpass_
    """
    @api.model
    def check_low_stock(self):
        low_stock_tools = self.search([('quantity'), '<', ('min_quantity')])
        for tool in low_stock_tools:
            self.env.user.notify_warning(
                f"Low stock alert for: {tool.tool_name}")

    """_Auto-disable tools when stock runs out_
    """
    def action_deactivate_tool(self):
        self.write({'is_active': False})
