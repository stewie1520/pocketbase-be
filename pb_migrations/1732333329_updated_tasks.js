/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c70ew4rz9h25l4f")

  // remove
  collection.schema.removeField("pckzae7k")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c70ew4rz9h25l4f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pckzae7k",
    "name": "status",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "todo",
        "in-progress",
        "to-review",
        "to-qa",
        "done"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
