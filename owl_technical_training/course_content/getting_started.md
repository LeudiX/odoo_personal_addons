# OWL Technical Training

Propietary Javascript Framework for Odoo

## Examples

Barcode App

1. Scan an operation to create a new transfer
2. Scan a document to open it
3. Scan a product to shows its location and quantity
4. Scan  Lot/SN to know its details

## Prerequisites

Javascript
Programming
Odoo

## Owl or Web Framework

Web Client [Navbar, User Menu, Actions]
    -> JS Framework [Generic Components, Views, Fields]
            -> Owl [Component]

## Odoo's Types of Apps

- Serverside rendering [ Website, Portal, Shop]
- Backend [ Internal users and apps]
  
  **Single Page Apps (SPAs): POS, Barcode**

## Set up Enviroment

- Officially supported versions [16,17,18]
- Community & Enterprise
- Keeping clones as simples as they are

    **Check for design-theme repository on Github**

## IDE & Browser

- VSCode or PyCharm
- Extensions
- Browser Extensions

## Premise

A new client, the company Tyranical Requests Inc., is going to give you some requests through a series of tasks.
The might also give you requests or they might give you unrelated tasks. They current iteration of development is
focused on the frontend so you'll expected to know a lot about Odoo's Web Framework OWL.

## Assets & Bundles

- Way of Odoo serves files to the frontend
- Bundle everything into a different packs and send them when is appropriate

## Statics

static directory/ [JS, SCSS, CSS, XML Templates, Fonts and Images]

## Bundles

- web.assets_common: Low-level building blocks of Odoo
- web.assets_backend: Web client
- web.assets_frontend: Public website
- web.qunit_suite_tests: JS tests
- web.quint_mobile_suite_tests: Mobile tests

## Advanced Bundling

- append: Default
- prepend: Add to the beginning
- before: Add before a specific asset
- after: Add after a specific asset
- remove: Zap it!
- replace: Take the place of an asset
- include: Nested bundling

Examples:

```python
'assets': {
    'web.assets_frontend': [
        ('before', 'website_sale/static/src/js/website_sale.js', 'website_sale_product_configurator/static/src/js/sale_product_configurator_modal.js'),
    ]}
```

## Dynamic Assets

- Bundling rules' model (ir.asset): Model representation of the assets in the database
- _get_addons_paths
- Last Resort
- Debugging [Dev mode, Monkey Extension (Odoo Debug) , debugger, --dev=all, Browser Inspector]

## Use Case 01: Change Odoo Font type

