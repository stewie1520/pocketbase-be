/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("437re742qrwlkc2")

  collection.options = {
    "query": "SELECT notification.id, users.name as fromUserName, users.id as fromUserId, users.avatar as fromUserAvatar, projects.id as projectId, projects.name as projectName, projects.avatar as projectAvatar, userId, notification.created, notification.updated, notification.message FROM notification\nLEFT JOIN users ON notification.`fromUserId` = users.id\nLEFT JOIN projects ON notification.`projectId` = projects.id"
  }

  // remove
  collection.schema.removeField("thkgn58b")

  // remove
  collection.schema.removeField("spiv7qe1")

  // remove
  collection.schema.removeField("btbpkrlu")

  // remove
  collection.schema.removeField("xnbu9ae4")

  // remove
  collection.schema.removeField("irmitedh")

  // remove
  collection.schema.removeField("yenkta21")

  // remove
  collection.schema.removeField("aynx0bxf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xnqmn0cp",
    "name": "fromUserName",
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
    "id": "k8dxsbdw",
    "name": "fromUserId",
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
    "id": "ck2hdbsc",
    "name": "fromUserAvatar",
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
    "id": "rtfguunb",
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
    "id": "xznjclb8",
    "name": "projectName",
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
    "id": "jgkysjrc",
    "name": "projectAvatar",
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
    "id": "8xl75eka",
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
    "id": "icif1sag",
    "name": "message",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("437re742qrwlkc2")

  collection.options = {
    "query": "SELECT notification.id, users.name as fromUserName, users.id as fromUserId, users.avatar as fromUserAvatar, projects.id as projectId, projects.name as projectName, projects.avatar as projectAvatar, userId, notification.created, notification.updated FROM notification\nLEFT JOIN users ON notification.`fromUserId` = users.id\nLEFT JOIN projects ON notification.`projectId` = projects.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "thkgn58b",
    "name": "fromUserName",
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
    "id": "spiv7qe1",
    "name": "fromUserId",
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
    "id": "btbpkrlu",
    "name": "fromUserAvatar",
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
    "id": "xnbu9ae4",
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
    "id": "irmitedh",
    "name": "projectName",
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
    "id": "yenkta21",
    "name": "projectAvatar",
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
    "id": "aynx0bxf",
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

  // remove
  collection.schema.removeField("xnqmn0cp")

  // remove
  collection.schema.removeField("k8dxsbdw")

  // remove
  collection.schema.removeField("ck2hdbsc")

  // remove
  collection.schema.removeField("rtfguunb")

  // remove
  collection.schema.removeField("xznjclb8")

  // remove
  collection.schema.removeField("jgkysjrc")

  // remove
  collection.schema.removeField("8xl75eka")

  // remove
  collection.schema.removeField("icif1sag")

  return dao.saveCollection(collection)
})
