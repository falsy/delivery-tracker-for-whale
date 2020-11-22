import repositories from "./repositories"
import infrastructures from "./infrastructures"
import Controller from './controllers'

const infra = infrastructures()
const repo = repositories(infra)

export default new Controller(repo.storage)