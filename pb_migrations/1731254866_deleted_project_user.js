/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ixrq1g873w6cq5l");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ixrq1g873w6cq5l",
    "created": "2024-11-10 16:06:11.428Z",
    "updated": "2024-11-10 16:06:22.035Z",
    "name": "project_user",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "79pjyjlq",
        "name": "avatar",
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
        "id": "wrjvcrip",
        "name": "name",
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
        "id": "vwyiy7wl",
        "name": "email",
        "type": "email",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT u.id as id, u.avatar, u.name, u.email FROM users u;\n"
    }
  });

  return Dao(db).saveCollection(collection);
})
