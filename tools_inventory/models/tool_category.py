# -*- coding: utf-8 -*-
import logging

from odoo import models, fields


_logger = logging.getLogger(__name__)


class ToolCategory(models.Model):
    _name = 'tool.category'
    _description = 'ToolCategory'

    name = fields.Char(string=("Category Name"), required=True)
    description = fields.Text(string="Description")
    parent_id = fields.Many2one(
        string=('Parent Category'),
        comodel_name='tool.category',
        help="Allows category hierarchy"
    )
