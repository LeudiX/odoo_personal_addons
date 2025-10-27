# -*- coding: utf-8 -*-
{
    "name": "Owl_technical_training",
    "version": "17.0.1.0.0",
    "summary": """ Owl_technical_training Summary """,
    "author": "LeudiX (Odoo Developer)",
    "website": "",
    "category": "Hidden",
    "depends": ["base", "web", "website"],
    "data": ["views/main.xml"],
    "assets": {
        "web.assets_frontend": [
            "owl_technical_training/static/src/**/*.js",
            "owl_technical_training/static/src/**/*.xml",
        ],
    },
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
