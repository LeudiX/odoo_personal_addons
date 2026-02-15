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
- In the search view, we must be able to search on more than just the name. Specifically, we want a filter for the ‘Available’ properties (i.e. the state should be **‘New’ or ‘Offer Received’)** and a shortcut to group by postcode.
- In the real estate module, we want the following information for a property:
  - the customer who bought the property (buyer: Any individual): **The buyer should not be copied**
  - the real estate agent who sold the property (salesperson: Odoo user (Employee): **The default value for the salesperson must be the current user)**
  - the property type: house, apartment, penthouse, castle…
  - a list of tags characterizing the property: cozy, renovated…
  - a list of the offers received
- In our real estate module, we want to define the concept of property tags. A property tag is, for example, a property which is **‘cozy’** or **‘renovated’**.
- In our real estate module, we want to define the concept of **property offers**. A property offer is an **amount a potential buyer offers to the seller**. The offer can be **lower or higher** than the expected price.
- In our real estate module, we have defined the **living area** as well as the **garden area**. It is then natural to define the **total area** as the **sum of both fields**
- In our real estate module, we want to compute the best offer.
  - Add the **best_price** field to **estate.property**. It is defined as the **highest** (i.e. maximum) of the **offers’ price**.
  - Add the field to the form view as depicted in the first image of this section’s Goal.

## TIPS

- Performance: CSV format is preferred over the XML format. This is the case in Odoo where loading a CSV file is faster than loading an XML file
- Refresh is always needed since the web client keeps a cache of the various menus and views for performance reasons
- Working on .py files always requires to restart the server
- Working on .xml or static files requires to update the apps list and the related module as well
- In Odoo, there are two models which we commonly refer to:
  - **res.partner:** a partner is a physical or legal entity. It can be a **company**, an **individual** or even a **contact** address.
  - **res.users:** the **users of the system**. Users can be **‘internal’**, i.e. they have access to the Odoo backend. Or they can be **‘portal’**, i.e. they cannot access the backend, only the frontend (e.g. to access their previous orders in eCommerce).

- The object **self.env** gives access to **request parameters** and other useful things:

```txt
  - self.env.cr or self._cr is the database cursor object; it is used for querying the database

  - self.env.uid or self._uid is the current user’s database id

  - self.env.user is the current user’s record

  - self.env.context or self._context is the context dictionary

  - self.env.ref(xml_id) returns the record corresponding to an XML id

  - self.env[model_name] returns an instance of the given model
```

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

## Relations between models

- Many2one: Simple link to another object.
  - Ex-1: A property can have **one type**, but the same **type** can be assigned to **many properties**.This is supported by the **many2one** concept
  - Ex-2: In order to define a link to the res.partner in our test model, we can write:

  ```py  
    partner_id = fields.Many2one("res.partner", string="Partner")
  ```

  - By convention, **many2one** fields have the **_id suffix**. Accessing the data in the partner can then be easily done with:

  ```py
    print(my_test_object.partner_id.name)
  ```

- Many2many: A many2many is a **bidirectional multiple relationship**: **any record on one side** can be related to **any number of records** on the other side.
  - Ex-1: A property can have **many tags** and a tag can be assigned to **many properties**.
  - Ex-2: In order to define a link to the account.tax model on our test model, we can write:

  ```py
    tax_ids = fields.Many2many("account.tax", string="Taxes")
  ```

  - By convention, **many2many** fields have the **_ids suffix**. This means that **several taxes** can be added to our test model. It behaves as a **list of records(recordsets)**, meaning that **accessing the data** must be done in a **loop**:

  ```py
    for tax in my_test_object.tax_ids:
    print(tax.name)
  ```

- One2many: A one2many is the inverse of a many2one.
  - Ex-1: **An offer** applies to **one property**, but the same **property** can have **many offers**. The concept of many2one appears once again. However, in this case we want to **display the list of offers** for a **given property** so we will use the **one2many concept**
  - Ex-2: We defined on our test model a link to the **res.partner** model thanks to the field **partner_id**. We can define the **inverse relation**, i.e. the **list of test models** linked to **our partner**:

  ```py
    test_ids = fields.One2many("test_model", "partner_id", string="Tests")
  ```

  The first parameter is called the **comodel** and the second parameter is the **field we want to inverse**
  By convention, **one2many fields** have the **_ids** suffix. They behave as a list of records, meaning that accessing the data must be done in a loop:

  ```py
    for test in partner.test_ids:
      print(test.name)
  ```
  
  ### DANGER : Because a **One2many** is a **virtual relationship**, there must be a **Many2one** field **defined** in the comodel

  - In Odoo, when we create a record through a **one2many** field, the corresponding **many2one** is populated automatically for convenience.

## Computed fields and Onchanges

Sometimes the value of one field is determined from the values of other fields and other times we want to help the user with data entry

### Computed fields

The **value** of a **given field** will **be computed** from the **value** of **other fields**

- To **create a computed field**, **create a field** and set its **attribute compute** to the **name of a method**. The **computation method** should **set the value** of the **computed field for every record in self**.
- By convention, **compute methods are private**, meaning that they **cannot be called** from the **presentation tier**, **only** from the **business tier**
- **Private methods** have a **name starting** with and underscore symbol: **_**
- The **ORM expects** the developer to **specify those dependencies** on the **compute method** with the decorator **depends()**

```py
from odoo import api, fields, models

class TestComputed(models.Model):
    _name = "test.computed"

    total = fields.Float(compute="_compute_total")
    amount = fields.Float()

    @api.depends("amount")
    def _compute_total(self):
        for record in self:
            record.total = 2.0 * record.amount
```

```txt
self is a collection.

The object self is a recordset, i.e. an ordered collection of records. It supports the standard Python operations on collections, e.g. len(self) and iter(self), plus extra set operations such as recs1 | recs2.

Iterating over self gives the records one by one, where each record is itself a collection of size 1. You can access/assign fields on single records by using the dot notation, e.g. record.name.
```

- For **relational fields** it’s possible to **use paths** through a field as a dependency

```py
description = fields.Char(compute="_compute_description")
partner_id = fields.Many2one("res.partner")

@api.depends("partner_id.name")
def _compute_description(self):
    for record in self:
        record.description = "Test for partner %s" % record.partner_id.name
```
