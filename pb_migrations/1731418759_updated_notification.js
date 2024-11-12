/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("relbz1nh7yaehsa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ygd5leaa",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "INVITE_TO_PROJECT"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dwlzd0bu",
    "name": "projectCollaboration",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "40jo7aoy5lfm950",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("relbz1nh7yaehsa")

  // remove
  collection.schema.removeField("ygd5leaa")

  // remove
  collection.schema.removeField("dwlzd0bu")

  return dao.saveCollection(collection)
})
