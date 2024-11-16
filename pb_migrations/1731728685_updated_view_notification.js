/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("437re742qrwlkc2")

  collection.options = {
    "query": "SELECT\n  notification.id,\n  users.name as fromUserName,\n  users.id as fromUserId,\n  users.avatar as fromUserAvatar,\n  projects.id as projectId,\n  projects.name as projectName,\n  projects.avatar as projectAvatar,\n  notification.userId,\n  notification.created,\n  notification.updated,\n  notification.message,\n  notification.seen,\n  notification.`projectCollaborationId`,\n  notification.type,\n  tasks.title as taskTitle,\n  tasks.id as taskId\nFROM notification\nLEFT JOIN users ON notification.`fromUserId` = users.id\nLEFT JOIN projects ON notification.`projectId` = projects.id\nLEFT JOIN tasks ON notification.`taskId` = tasks.id"
  }

  // remove
  collection.schema.removeField("y8chvndv")

  // remove
  collection.schema.removeField("yyeyo5ks")

  // remove
  collection.schema.removeField("j5sijgdr")

  // remove
  collection.schema.removeField("hmraej0p")

  // remove
  collection.schema.removeField("42z5agxu")

  // remove
  collection.schema.removeField("yssd0u8t")

  // remove
  collection.schema.removeField("gwedmnaf")

  // remove
  collection.schema.removeField("oqptpezg")

  // remove
  collection.schema.removeField("tm9svgn2")

  // remove
  collection.schema.removeField("pfte2kzz")

  // remove
  collection.schema.removeField("znks2ewb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vm4tsoty",
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
    "id": "o21r14ji",
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
    "id": "botuxttj",
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
    "id": "o4bv1ov1",
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
    "id": "sqd15fsl",
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
    "id": "iehsyuku",
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
    "id": "uw3bcank",
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
    "id": "d6022wz3",
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
    "id": "ep3drpzw",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a9fkro6k",
    "name": "projectCollaborationId",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yt4sydxv",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mwigvcae",
    "name": "taskTitle",
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
    "id": "inf8sqqi",
    "name": "taskId",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("437re742qrwlkc2")

  collection.options = {
    "query": "SELECT\n  notification.id,\n  users.name as fromUserName,\n  users.id as fromUserId,\n  users.avatar as fromUserAvatar,\n  projects.id as projectId,\n  projects.name as projectName,\n  projects.avatar as projectAvatar,\n  notification.userId,\n  notification.created,\n  notification.updated,\n  notification.message,\n  notification.seen,\n  notification.`projectCollaborationId`,\n  notification.type\nFROM notification\nLEFT JOIN users ON notification.`fromUserId` = users.id\nLEFT JOIN projects ON notification.`projectId` = projects.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y8chvndv",
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
    "id": "yyeyo5ks",
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
    "id": "j5sijgdr",
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
    "id": "hmraej0p",
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
    "id": "42z5agxu",
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
    "id": "yssd0u8t",
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
    "id": "gwedmnaf",
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
    "id": "oqptpezg",
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
    "id": "tm9svgn2",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pfte2kzz",
    "name": "projectCollaborationId",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "znks2ewb",
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

  // remove
  collection.schema.removeField("vm4tsoty")

  // remove
  collection.schema.removeField("o21r14ji")

  // remove
  collection.schema.removeField("botuxttj")

  // remove
  collection.schema.removeField("o4bv1ov1")

  // remove
  collection.schema.removeField("sqd15fsl")

  // remove
  collection.schema.removeField("iehsyuku")

  // remove
  collection.schema.removeField("uw3bcank")

  // remove
  collection.schema.removeField("d6022wz3")

  // remove
  collection.schema.removeField("ep3drpzw")

  // remove
  collection.schema.removeField("a9fkro6k")

  // remove
  collection.schema.removeField("yt4sydxv")

  // remove
  collection.schema.removeField("mwigvcae")

  // remove
  collection.schema.removeField("inf8sqqi")

  return dao.saveCollection(collection)
})
