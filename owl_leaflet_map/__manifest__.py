# -*- coding: utf-8 -*-
{
    'name': 'Owl_leaflet_map',
    'version': '17.0.1.0.0',
    'summary': """ Owl_leaflet_Map Summary """,
    'author': 'LeudiX (Odoo Junior Developer)',
    'website': '',
    'category': 'Hidden',
    'depends': ['base', 'web'],
    'data': [],
    'assets': {
              'web.assets_backend': [
                  'owl_leaflet_map/static/src/**/*'
              ],
          },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
