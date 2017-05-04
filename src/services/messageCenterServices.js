import {get} from './../utils/api'



 export async function GetMessages(userId,boxType) {
   return get('Messages/GetMessages?userId='+encodeURIComponent(userId)+'&boxType='+encodeURIComponent(boxType));
 }