export const storageService = {
    query, // get all entities
    get, // get one entity whose ID matches the given ID
    post, // add a new entity
    remove // remove an entity
}


function query(entityType, delay = 1000){
    var entities = JSON.parse(localStorage.getItem(entityType) || [])
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}


async function get(entityType, entityId){ // getById
    const entities = await query(entityType)
    const entity = entities.find(entity => entity.id === entityId)
    if(!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    return entity
}


async function post(entityType, newEntity){ // create
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
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