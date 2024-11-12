/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0pupyj22ac2gskq")

  collection.options = {
    "query": "SELECT projects.id, projects.name, projects.avatar, projects.description, projects.`ownerId`, project_collaboration.`userId` as memberId\nFROM projects\nINNER JOIN project_collaboration ON project_collaboration.`projectId` = projects.id\nINNER JOIN users ON projects.`ownerId` = users.id"
  }

  // remove
  collection.schema.removeField("tzor4snp")

  // remove
  collection.schema.removeField("c5gr4biq")

  // remove
  collection.schema.removeField("tmep20pl")

  // remove
  collection.schema.removeField("uixca8f1")

  // remove
  collection.schema.removeField("qi6ntvw9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ds0ezon",
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
    "id": "oojs3fsv",
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
    "id": "gaf47n4a",
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
    "id": "uvmvpvel",
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
    "id": "i4tobi39",
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
    "query": "SELECT projects.id, projects.name, projects.avatar, projects.description, projects.`ownerId`, project_collaboration.`userId` as memberId\nFROM projects\nINNER JOIN project_collaboration ON project_collaboration.`projectId` = projects.id\nINNER JOIN users ON project_collaboration.`userId` = users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzor4snp",
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
    "id": "c5gr4biq",
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
    "id": "tmep20pl",
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
    "id": "uixca8f1",
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
    "id": "qi6ntvw9",
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
  collection.schema.removeField("8ds0ezon")

  // remove
  collection.schema.removeField("oojs3fsv")

  // remove
  collection.schema.removeField("gaf47n4a")

  // remove
  collection.schema.removeField("uvmvpvel")

  // remove
  collection.schema.removeField("i4tobi39")

  return dao.saveCollection(collection)
})
