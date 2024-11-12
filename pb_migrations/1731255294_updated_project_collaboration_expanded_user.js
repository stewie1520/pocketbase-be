/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fsmerck017gmmrr")

  collection.options = {
    "query": "SELECT pc.id, pc.`projectId`, pc.created, pc.updated, u.id as userId, u.avatar as userAvatar, u.email as userEmail, u.name as userName, p.`ownerId` as projectOwnerId\nFROM project_collaboration pc\nINNER JOIN users u\nON pc.`userId` = u.id\nINNER JOIN projects p\nON p.id = pc.`projectId`"
  }

  // remove
  collection.schema.removeField("dw8kkf78")

  // remove
  collection.schema.removeField("vyl02reh")

  // remove
  collection.schema.removeField("1uedviy6")

  // remove
  collection.schema.removeField("vy6mq1se")

  // remove
  collection.schema.removeField("ytkwhc4k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzdfgbni",
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
    "id": "i8jf4al4",
    "name": "userId",
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
    "id": "3biahit0",
    "name": "userAvatar",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": null,
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x8senvg9",
    "name": "userEmail",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rldirygk",
    "name": "userName",
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
    "id": "fskolnhn",
    "name": "projectOwnerId",
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
  const collection = dao.findCollectionByNameOrId("fsmerck017gmmrr")

  collection.options = {
    "query": "SELECT pc.id, pc.`projectId`, pc.created, pc.updated, u.id as userId, u.avatar as userAvatar, u.email as userEmail, u.name as userName FROM project_collaboration pc\nINNER JOIN users u\nON pc.`userId` = u.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dw8kkf78",
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
    "id": "vyl02reh",
    "name": "userId",
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
    "id": "1uedviy6",
    "name": "userAvatar",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": null,
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vy6mq1se",
    "name": "userEmail",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ytkwhc4k",
    "name": "userName",
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

  // remove
  collection.schema.removeField("fzdfgbni")

  // remove
  collection.schema.removeField("i8jf4al4")

  // remove
  collection.schema.removeField("3biahit0")

  // remove
  collection.schema.removeField("x8senvg9")

  // remove
  collection.schema.removeField("rldirygk")

  // remove
  collection.schema.removeField("fskolnhn")

  return dao.saveCollection(collection)
})
