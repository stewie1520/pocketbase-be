/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2d0ydx5c",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  // remove
  collection.schema.removeField("2d0ydx5c")

  return dao.saveCollection(collection)
})
