import { request } from './generic.service'

const getTankUsers = async () => await request({ url: 'relations', method: 'get' })
const postTankUser = async () => await request({ url: 'tank-user', method: 'post' })
const postUser = async () => await request({ url: 'user', method: 'post' })

export { getTankUsers, postTankUser, postUser }
