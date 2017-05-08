import moment from 'moment';

export function MessageFormatDate(timeStamp){
  return moment(timeStamp).format('MM/DD')
}

export function MessageFormatAllDate(timeStamp){
  return moment(timeStamp).format('MM/DD/YYYY dddd HH:mm')
}