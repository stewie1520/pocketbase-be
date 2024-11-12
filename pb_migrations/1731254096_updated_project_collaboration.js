/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40jo7aoy5lfm950")

  collection.listRule = "userId = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40jo7aoy5lfm950")

  collection.listRule = ""

  return dao.saveCollection(collection)
})
