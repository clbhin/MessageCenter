import moment from 'moment';

export function MessageFormatDate(timeStamp){
  return moment(timeStamp).format('MM/DD')
}