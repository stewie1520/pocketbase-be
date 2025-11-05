/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("686argpk6b2gvsh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "trma8ppy",
    "name": "isShowingOnBoard",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("686argpk6b2gvsh")

  // remove
  collection.schema.removeField("trma8ppy")

  return dao.saveCollection(collection)
})
