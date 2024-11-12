/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("relbz1nh7yaehsa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vernzb1p",
    "name": "seen",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("relbz1nh7yaehsa")

  // remove
  collection.schema.removeField("vernzb1p")

  return dao.saveCollection(collection)
})
