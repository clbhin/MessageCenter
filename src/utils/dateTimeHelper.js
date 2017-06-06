import moment from 'moment';

export function MessageFormatDate(timeStamp){
  return moment(timeStamp).format('MM/DD')
}

export function MessageFormatAllDate(timeStamp){
  return moment(timeStamp).format('MM/DD/YYYY dddd HH:mm')
}

export function FormatWeekAndDate(timeStamp){
  return moment(timeStamp).format('dddd,MMMM DD,YYYY hh:mm a')
}