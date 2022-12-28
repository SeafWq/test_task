import { request } from './generic.service'
const getTank = async (id) => await request({ url: `tank/${id}`, method: 'get' })

const getTanks = async () => await request({ url: 'tanks', method: 'get' })

export { getTank, getTanks }
