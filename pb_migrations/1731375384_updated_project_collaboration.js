/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40jo7aoy5lfm950")

  collection.deleteRule = "(@request.auth.id = userId || @request.auth.id = projectId.ownerId) && (projectId.ownerId != userId)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40jo7aoy5lfm950")

  collection.deleteRule = "@request.auth.id = userId || @request.auth.id = projectId.ownerId"

  return dao.saveCollection(collection)
})
