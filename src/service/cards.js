import request from '../util/request';

// 调用根目录下mock数据，mock/cards.js

export function queryList() {
  return request('/api/cards');
}

export function deleteOne(id) {
  return request(`/api/cards/${id}`, {
    method: 'DELETE'
  });
}

export function addOne(data) {
  return request('/api/cards/add', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getStatistic(id) {
  return request(`/api/cards/${id}/statistic`);
}