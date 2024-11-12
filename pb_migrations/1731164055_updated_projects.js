/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  collection.listRule = "ownerId = @request.auth.id"
  collection.viewRule = "ownerId = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kmbwosjtgf52nzo")

  collection.listRule = "(ownerId = @request.auth.id) || (project_collaboration_via_projectId.userId = @request.auth.id)"
  collection.viewRule = "(ownerId = @request.auth.id) || (project_collaboration_via_projectId.userId = @request.auth.id)"

  return dao.saveCollection(collection)
})
