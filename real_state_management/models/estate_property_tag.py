# -*- coding: utf-8 -*-
import logging

from random import randint

from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class EstatePropertyTag(models.Model):
    _name = "estate.property.tag"
    _description = "Property Tag"

    # Basic
    name = fields.Char("Name", required=True)
    color = fields.Integer("Color Index", default=lambda self: self._default_color())

    # Constraints
    _sql_constraints = [
        ("name_uniq", "unique (name)", "Tag name already exists!"),
    ]

    def _default_color(self):
        return randint(1, 11)
