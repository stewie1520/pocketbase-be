/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0pupyj22ac2gskq")

  collection.options = {
    "query": "SELECT project_collaboration.id, projects.id as projectId, projects.name, projects.avatar, projects.description, projects.`ownerId`, project_collaboration.`userId` as memberId\nFROM project_collaboration\nINNER JOIN projects ON project_collaboration.`projectId` = projects.id\nINNER JOIN users ON projects.`ownerId` = users.id"
  }

  // remove
  collection.schema.removeField("dw72r7pz")

  // remove
  collection.schema.removeField("tkqe6hkm")

  // remove
  collection.schema.removeField("oeyhphab")

  // remove
  collection.schema.removeField("cgqsq1li")

  // remove
  collection.schema.removeField("num1bphr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4qhhsk7v",
    "name": "projectId",
    "type": "relation",
    "required": false,
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dndoell2",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hgjh5s3x",
    "name": "avatar",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n3jzjdjv",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pwboj3fz",
    "name": "ownerId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwi4lqsy",
    "name": "memberId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0pupyj22ac2gskq")

  collection.options = {
    "query": "SELECT project_collaboration.id, projects.name, projects.avatar, projects.description, projects.`ownerId`, project_collaboration.`userId` as memberId\nFROM project_collaboration\nINNER JOIN projects ON project_collaboration.`projectId` = projects.id\nINNER JOIN users ON projects.`ownerId` = users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dw72r7pz",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tkqe6hkm",
    "name": "avatar",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oeyhphab",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cgqsq1li",
    "name": "ownerId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "num1bphr",
    "name": "memberId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("4qhhsk7v")

  // remove
  collection.schema.removeField("dndoell2")

  // remove
  collection.schema.removeField("hgjh5s3x")

  // remove
  collection.schema.removeField("n3jzjdjv")

  // remove
  collection.schema.removeField("pwboj3fz")

  // remove
  collection.schema.removeField("xwi4lqsy")

  return dao.saveCollection(collection)
})
