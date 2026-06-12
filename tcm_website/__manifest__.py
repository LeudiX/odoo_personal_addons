# -*- coding: utf-8 -*-
{
    "name": "Pyxel TCM Website",
    "version": "19.0.1.0",
    "summary": """Custom web interface for TCM Mariel main ooperations using Bootstrap 5 styling""",
    "author": "Pyxel Solutions",
    "contributors": "Leudis Estrada González <leudix.rafael@gmail.com>",
    "website": "",
    "category": "Website",
    "depends": [
        "website",
        "crm_website_lead",
    ],
    "data": [
        "views/components/footer.xml",
        "views/components/navbar.xml",
        "views/components/portal_home.xml",
        "views/layout/base_layout.xml",
        "views/pages/contactus_page.xml",
        "views/pages/home_page.xml",
        "views/templates/ticket_search_template.xml",
    ],
    "assets": {
        "web.assets_frontend": ["pyxel_tcm_website/static/***/**/*"],
    },
    "application": False,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
