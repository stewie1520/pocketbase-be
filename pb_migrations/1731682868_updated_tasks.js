/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c70ew4rz9h25l4f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cfhxpo9h",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c70ew4rz9h25l4f")

  // remove
  collection.schema.removeField("cfhxpo9h")

  return dao.saveCollection(collection)
})
