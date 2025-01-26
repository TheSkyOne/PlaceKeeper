export const storageService = {
    query, // get all entities
    get, // get one entity whose ID matches the given ID
    post, // add a new entity
    put, // update an existing entity
    remove, // remove an entity
}


function query(entityType, delay = 1000){
    var entities = JSON.parse(localStorage.getItem(entityType) || [])
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}


async function get(entityType, entityId){
    const entities = await query(entityType)
    const entity = entities.find(entity => entity.id === entityId)
    if(!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    return entity
}


async function post(entityType, newEntity){
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
}


async function put(entityType, updatedEntity){
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
    if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)

    const entityToUpdate = {...entities[idx], ...updatedEntity} // make a new entity object with all the previous entity's info overriden by the new one's
    entities.splice(idx, 1, entityToUpdate)
    _save(entityType, entities)
    
    return updatedEntity
}


async function remove(entityType, entityId){
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity.id === entityId)
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType} to remove`)
    
    entities.splice(idx, 1)
    _save(entityType, entities)
}


function _save(entityType, entities){
    localStorage.setItem(entityType, JSON.stringify(entities))
}