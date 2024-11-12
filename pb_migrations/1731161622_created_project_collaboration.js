/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "40jo7aoy5lfm950",
    "created": "2024-11-09 14:13:42.720Z",
    "updated": "2024-11-09 14:13:42.720Z",
    "name": "project_collaboration",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nrh5tdpt",
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
        "id": "kyzyqfju",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("40jo7aoy5lfm950");

  return dao.deleteCollection(collection);
})
