import { checkEntryEndpointsDocumentation } from './check-entry/index.js'
import { userEndpointsDocumentation } from './user/index.js'
import { reportEndpointsDocumentation } from './reports/index.js'

export const moduleEndpointsDocumentation = {
  ...checkEntryEndpointsDocumentation,
  ...userEndpointsDocumentation,
  ...reportEndpointsDocumentation
}
