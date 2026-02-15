# Odoo Architecture Overview

- Uses a 3 tier architecture: presentation layer, business logic and data storage
  - Presentation layer: HTML5, JS and CSS (OWL)
  - Logic Tier: Python
  - Data Tier: PostgreSQL (RDBMS)

- Module: Collection of functions and data that targets a purpose (business features)
  - Elements:
    - Business objects (Classes)
    - Object Views  (UI)
    - Data files (XML or CSV files: views, reports, config, security rules, demo)
    - Controllers
    - Static Web data

## Real State Advertisement module

- Before create a new module, always verify if the solution it isnt already covered by one of
the native modules of the ecosystem, you can also go to the OCA and Odoo mates repo in order to
access some community modules. Finally, there is also the paid option

## Developer mode

- Always enable developer mode so u can see the Update Apps List button

## Business Requirements

- I want to store the information related to the properties (name, description, price, living area…) in a database
- The selling price should be read-only and the number of bedrooms and the availability date should have default values.
- The selling price and availability date values won’t be copied when the record is duplicated.
- Default no. of bedrooms should be 2
- Default availability date should be in 3 months
- In the list (tree) view, we want to display more than just the name.
- In the form view, the fields should be grouped.
- In the search view, we must be able to search on more than just the name. Specifically, we want a filter for the ‘Available’ properties (i.e. the state should be ‘New’ or ‘Offer Received’) and a shortcut to group by postcode.

## TIPS

- Performance: CSV format is preferred over the XML format. This is the case in Odoo where loading a CSV file is faster than loading an XML file
- Refresh is always needed since the web client keeps a cache of the various menus and views for performance reasons
- Working on .py files always requires to restart the server
- Working on .xml or static files requires to update the apps list and the related module as well

### UI

- UI is conformed by (actions, menus and views): Pattern (Menu > Action > View)

- Actions can be triggered in 3 ways:
  - by clicking on menu items (linked to specific actions)
  - by clicking on buttons in views (if these are connected to actions)
  - as contextual actions on object

- Menus always follows an architecture (3 levels of menus)
  - Root menu: Displayed in the Odoo App Switcher (Dropdown menu in Community)
  - First level menu: Displayed in top bar of the module
  - Root menu: Action menus

- Fine tunning the views:
  - Some fields have a default value
  - Some fields are read only
  - Some fields are not copied when duplicating the record

- Search views filter the content present in other views (Tree, Kanban, Graph, etc)

- Filters must have one of the following attributes:
  - domain: adds a given domain to the current search (encodes condition o records)
  
  ```py
    domain="[('field_name', '=', 'value')]" 
  ```

  ```py
    # Selects all the products of type service with a unit price greater that 1000
    [('product_type', '=', 'service'), ('unit_price', '>', 1000)]

    # Select all the products ‘which are services OR have a unit price which is NOT between 1000 and 2000’
    ['|',
    ('product_type', '=', 'service'),
    '!', '&',
        ('unit_price', '>=', 1000),
        ('unit_price', '<', 2000)]
  ```

  - context: adds some context to the current search (uses the key **group_by** to group results on the given field name)
