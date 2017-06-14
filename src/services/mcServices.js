import lodash from 'lodash';
import {FormatWeekAndDate} from '../utils/dateTimeHelper';

export function getNames(personNames) {
  return lodash.join(lodash.map(personNames, 'PersonName'), ',')
}

export function spliceMessage(message) {
  let sendItem = "<div style='margin-bottom: 20px;color: #000;'>";
  sendItem += "<div style='height:50px;margin-top:10px;'></div>";
  sendItem += "<div style='height:1px;background-color:#ccc;'> </div>";                    
  sendItem += "<div style='border-top:1px solid #ccc;width:100%;'>";
  sendItem += "<div><span style='font-weight: bold;color: #000;'>From: </span><span>" + message.From.PersonName + "</span></div>";
  sendItem += "<div><span style='font-weight: bold;color: #000;'>Sent: </span>" + FormatWeekAndDate(message.Timestamp) + "</div>";
  sendItem += "<div><span style='font-weight: bold;color: #000;'>To: </span>" + getNames(message.To) + "</div>";
  sendItem += "<div><span style='font-weight: bold;color: #000;'>Subject: </span>" + message.Subject.replace(/RE:|FW:/,'') + "</div>";
  sendItem += "</div>";
  sendItem += "<div style='height:10px;'></div></div>";
  sendItem += "<div style='color: #000;'>";
  sendItem += lodash.isEmpty(message.MessageBody) ? "":message.MessageBody ;
  sendItem += "</div>";
  return sendItem;
}

export function formatStyle(labelString){
  return labelString.replace(/style=[\',\"].*?[\',\"]/gi,'')
}

export function formatLabelStyle(labelString) {
  return labelString.replace(/\<.*?\>/gi, '')
}
