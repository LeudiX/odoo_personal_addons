# -*- coding: utf-8 -*-
#############################################################################
#
#   TropiPay.
#   soporte@tropipay.com
#
#############################################################################
{
    'name': 'Tropipay Payment Gateway',
    'category': 'Accounting/Payment Acquirers',
    'version': '17.0.1.0.0',
    'description': """Tropipay Payment Gateway V1.2""",
    'Summary': """Tropipay Payment Gateway V1.2""",
    'author': "TropiPay",
    'company': 'TropiPay',
    'maintainer': 'Tropipay',
    'website': "https://www.tropipay.com",
    'depends': ['payment', 'account', 'website', 'website_sale'],
    'data': [
        'views/payment_template.xml',
        'views/payment_tpp_templates.xml',
        'data/payment_provider_data.xml',
    ],
    'post_init_hook': 'post_init_hook',
    'uninstall_hook': 'uninstall_hook',
    'images': ['static/description/tropipaylogo.png'],
    'license': 'LGPL-3',
    'installable': True,
    'application': True,
    'auto_install': False,
}
