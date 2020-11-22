import { IInfrastructure } from "./interfaces"
import WebStorage from "./WebStorage"

export default (): IInfrastructure => {
  return {
    storage: new WebStorage(),
  }
}