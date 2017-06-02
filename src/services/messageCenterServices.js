import { get } from './../utils/api';
import { post } from './../utils/api';
import { getConfiguration } from '../utils/configuration';

const API_ROOT = getConfiguration('API_ROOT');

export function url(path) {
  const apiRoot = getConfiguration('API_ROOT');
  return path.indexOf('/') === 0
    ? apiRoot + path
    : apiRoot + '/' + path;
}

export async function GetMessages(userId, boxType) {
  return get('Messages/GetMessages?userId=' + encodeURIComponent(userId) + '&boxType=' + encodeURIComponent(boxType));
}

export async function SendMessage(message) {
  return fetch(url("Messages/SendMessage"), {
    method: "POST",
    headers: {},
    body: message
  })
}

export async function SaveAsDraft(message) {
  return fetch(url("Messages/SaveAsDraft"), {
    method: "POST",
    headers: {},
    body: message
  })
}


export async function DeleteMessage(message) {
  return post('Messages/DeleteMessage', message)
}

export async function ReadUserMessage(userMessage) {
  return post('Messages/ReadUserMessage', userMessage)
}

export async function MarkUserMessage(userMessage) {
  return post('Messages/MarkUserMessage', userMessage)
}

export async function SearchMessages(criteriaCollection) {
  return post('Messages/SearchMessages', criteriaCollection)
}

export async function LoadMoreMessages(userMessage) {
  return post('Messages/SearchMessages', userMessage)
}