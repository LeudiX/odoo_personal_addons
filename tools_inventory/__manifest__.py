# -*- coding: utf-8 -*-
{
    'name': 'Tool Inventory Management',
    'version': '1.0',
    'summary': """ Manage tool inventory and track movements """,
    'author': 'LeudiX',
    'category': 'Inventory',
    'depends': ['base', 'stock', 'owl_leaflet_map'],
    "data": [
        "security/groups.xml",
        "security/ir.model.access.csv",
        "data/sequences.xml",
        "views/tool_inventory_menu_views.xml",
        "views/tool_inventory_views.xml",
        "views/tool_category_views.xml",
        "views/inventory_movement_views.xml"
    ],
    'application': True,
    'installable': True,
    'license': 'LGPL-3',
}
