/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "437re742qrwlkc2",
    "created": "2024-11-12 05:59:51.501Z",
    "updated": "2024-11-12 05:59:51.501Z",
    "name": "view_notification",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tyn6b7td",
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
      },
      {
        "system": false,
        "id": "5mu02xvt",
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
      },
      {
        "system": false,
        "id": "ssyiw3wb",
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
      },
      {
        "system": false,
        "id": "lhpytezg",
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
      },
      {
        "system": false,
        "id": "smqlezl5",
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
      },
      {
        "system": false,
        "id": "wyolfty6",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT notification.id, users.name as fromUserName, users.id as fromUserId, users.avatar as fromUserAvatar, projects.id as projectId, projects.name as projectName, projects.avatar as projectAvatar FROM notification\nLEFT JOIN users ON notification.`fromUserId` = users.id\nLEFT JOIN projects ON notification.`projectId` = projects.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("437re742qrwlkc2");

  return dao.deleteCollection(collection);
})
