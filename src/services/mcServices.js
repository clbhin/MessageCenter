import lodash from 'lodash'

export function getNames(personNames){
  return lodash.join(lodash.map(personNames,'PersonName'),',')
}