/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("437re742qrwlkc2")

  collection.options = {
    "query": "SELECT\n  notification.id,\n  users.name as fromUserName,\n  users.id as fromUserId,\n  users.avatar as fromUserAvatar,\n  projects.id as projectId,\n  projects.name as projectName,\n  projects.avatar as projectAvatar,\n  notification.userId,\n  notification.created,\n  notification.updated,\n  notification.message,\n  notification.seen\nFROM notification\nLEFT JOIN users ON notification.`fromUserId` = users.id\nLEFT JOIN projects ON notification.`projectId` = projects.id"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lv7yb8g5",
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
    "id": "b4bvjf4p",
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
    "id": "jf8k2rbf",
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
    "id": "xt2uwnmw",
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
    "id": "civoavji",
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
    "id": "csi7tgo2",
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
    "id": "yehlqk4o",
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
    "id": "vdy9h4i2",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pbeocdf6",
    "name": "seen",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("437re742qrwlkc2")

  collection.options = {
    "query": "SELECT notification.id, users.name as fromUserName, users.id as fromUserId, users.avatar as fromUserAvatar, projects.id as projectId, projects.name as projectName, projects.avatar as projectAvatar, userId, notification.created, notification.updated, notification.message FROM notification\nLEFT JOIN users ON notification.`fromUserId` = users.id\nLEFT JOIN projects ON notification.`projectId` = projects.id"
  }

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

  // remove
  collection.schema.removeField("lv7yb8g5")

  // remove
  collection.schema.removeField("b4bvjf4p")

  // remove
  collection.schema.removeField("jf8k2rbf")

  // remove
  collection.schema.removeField("xt2uwnmw")

  // remove
  collection.schema.removeField("civoavji")

  // remove
  collection.schema.removeField("csi7tgo2")

  // remove
  collection.schema.removeField("yehlqk4o")

  // remove
  collection.schema.removeField("vdy9h4i2")

  // remove
  collection.schema.removeField("pbeocdf6")

  return dao.saveCollection(collection)
})
