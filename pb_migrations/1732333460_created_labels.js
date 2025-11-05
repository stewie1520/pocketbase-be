/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "686argpk6b2gvsh",
    "created": "2024-11-23 03:44:20.478Z",
    "updated": "2024-11-23 03:44:20.478Z",
    "name": "labels",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eo3mmcqa",
        "name": "projectId",
        "type": "relation",
        "required": true,
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
        "id": "cxfazo57",
        "name": "label",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "epo1g4tz",
        "name": "slug",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_dHD7vpk` ON `labels` (\n  `projectId`,\n  `slug`\n)"
    ],
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
  const collection = dao.findCollectionByNameOrId("686argpk6b2gvsh");

  return dao.deleteCollection(collection);
})
