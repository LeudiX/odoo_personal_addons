# -*- coding: utf-8 -*-
import logging

from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)


class EstatePropertyType(models.Model):
    _name = "estate.property.type"
    _description = "Property Type"

    # Basic
    name = fields.Char("Name", required=True)

    # Constraints
    _sql_constraints = [
        ("name_uniq", "unique (name)", "Type name already exists for this property!"),
    ]
