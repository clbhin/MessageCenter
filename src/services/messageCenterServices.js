import {get} from './../utils/api'
import {post} from './../utils/api'



 export async function GetMessages(userId,boxType) {
   return get('Messages/GetMessages?userId='+encodeURIComponent(userId)+'&boxType='+encodeURIComponent(boxType));
 }

 export async function SendMessage(message){
   return post('Messages/SendMessage',message)
 }

 export async function DeleteMessage(message){
   return post('Messages/DeleteMessage',message)
 }

 export async function ReadUserMessage(userMessage){
   return post('Messages/ReadUserMessage',userMessage)
 }