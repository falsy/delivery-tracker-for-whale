import { IInfrastructure } from "./interfaces"
import Remote from "./Remote"
import WebStorage from "./WebStorage"

export default (): IInfrastructure => {
  return {
    storage: new WebStorage(),
    remote: new Remote()
  }
}