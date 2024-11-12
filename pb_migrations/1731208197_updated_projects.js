/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  collection.createRule = "ownerId = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  collection.createRule = ""

  return dao.saveCollection(collection)
})
