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
        'security/ir.model.access.csv',
        'views/estate_property_views.xml',
        'views/estate_property_type_views.xml',
        'views/estate_property_tag_views.xml',
        'views/estate_property_offer_views.xml',
        'views/estate.menus.xml',
    ],
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
