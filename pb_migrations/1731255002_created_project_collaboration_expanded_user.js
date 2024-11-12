/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fsmerck017gmmrr",
    "created": "2024-11-10 16:10:02.304Z",
    "updated": "2024-11-10 16:10:02.304Z",
    "name": "project_collaboration_expanded_user",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT pc.id, pc.`projectId`, pc.created, pc.updated, u.id as userId, u.avatar as userAvatar, u.email as userEmail, u.name as userName FROM project_collaboration pc\nINNER JOIN users u\nON pc.`userId` = u.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fsmerck017gmmrr");

  return dao.deleteCollection(collection);
})
