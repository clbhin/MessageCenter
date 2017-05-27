import lodash from 'lodash'

export function getNames(personNames) {
  return lodash.join(lodash.map(personNames, 'PersonName'), ',')
}

export function spliceMessage(message) {
  return '\n-----original message-----\nSubject:' + message.Subject + '\nFrom:' + message.From.PersonName + '\nTo:' + getNames(message.To) + '\nCc:' + getNames(message.Cc) + '\nBcc:' + getNames(message.Bcc) + '\n' + message.MessageBody
}
