/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "obgngbb0",
    "name": "project_collaborations",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "40jo7aoy5lfm950",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  // remove
  collection.schema.removeField("obgngbb0")

  return dao.saveCollection(collection)
})
