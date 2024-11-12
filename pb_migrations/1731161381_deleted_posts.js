/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0kcwgji5vxybira");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "0kcwgji5vxybira",
    "created": "2024-11-08 04:27:54.843Z",
    "updated": "2024-11-08 04:27:54.843Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zv7wk9cl",
        "name": "content",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "pln8rita",
        "name": "title",
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
        "id": "ar84vxmi",
        "name": "authorId",
        "type": "relation",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "pe03aqfz",
        "name": "published",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_SEptpog` ON `posts` (`title`)"
    ],
    "listRule": "(@request.auth.id != authorId && published = true) || (@request.auth.id = authorId)",
    "viewRule": "(@request.auth.id != authorId && published = true) || (@request.auth.id = authorId)",
    "createRule": "",
    "updateRule": "@request.auth.id = authorId",
    "deleteRule": "@request.auth.id = authorId",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
