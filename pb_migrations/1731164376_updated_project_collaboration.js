/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40jo7aoy5lfm950")

  collection.listRule = "userId = @request.auth.id"
  collection.viewRule = "userId = @request.auth.id"
  collection.createRule = "@request.auth.id = projectId.ownerId"
  collection.updateRule = "@request.auth.id = userId || @request.auth.id = projectId.ownerId"
  collection.deleteRule = "@request.auth.id = userId || @request.auth.id = projectId.ownerId"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40jo7aoy5lfm950")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
