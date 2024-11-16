/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8rkrhh0p6h79rjl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kyr6xfje",
    "name": "projectId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "kmbwosjtgf52nzo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8rkrhh0p6h79rjl")

  // remove
  collection.schema.removeField("kyr6xfje")

  return dao.saveCollection(collection)
})
