# -*- coding: utf-8 -*-
{
    "name": "real_state_management",
    "version": "17.0.0.1",
    "summary": """ Odoo module to manage real estate assets """,
    "author": "",
    "website": "",
    "category": "",
    "depends": [
        "base",
        "mail",
    ],
    'data': [
        'views/estate.menus.xml',
        'views/estate_property_views.xml',
        'security/ir.model.access.csv'
    ],
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
