/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("relbz1nh7yaehsa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbbckqfc",
    "name": "task",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "c70ew4rz9h25l4f",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
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
        "INVITE_TO_PROJECT",
        "ASSIGNED_TO_TASK"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("relbz1nh7yaehsa")

  // remove
  collection.schema.removeField("vbbckqfc")

  // update
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

  return dao.saveCollection(collection)
})
