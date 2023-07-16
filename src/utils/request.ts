/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-16 15:18:17
 * @LastEditors: wsy
 */
import { isDevelopment, isH5 } from './platform';
import { forward } from './router';
import { getCommonParams } from '@/config/commonParams';
import env from '@/config/env';
import { hideLoading, showLoading } from '@/config/serviceLoading';

const enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  TRACE = 'TRACE'
}

function reject(err: { errno: number; errmsg: string }) {
  const { errmsg = '抢购火爆，稍候片刻！', errno = -1 } = err;
  switch (errno) {
    case 10000:
      // 特殊异常处理
      forward('login');
      break;

    default:
      uni.showToast({
        title: errmsg
      });
      break;
  }
}

// h5环境开启代理
const apiBaseUrl = isH5 && isDevelopment ? '/api' : env.apiBaseUrl;

function baseRequest(
  method: RequestMethod,
  url: string,
  data: { isLoading: any }
) {
  return new Promise((resolve) => {
    showLoading(data.isLoading);
    delete data.isLoading;
    let responseDate: unknown;
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: {
        'content-type': 'application/json; charset=utf-8'
      },
      data,
      success: (res: any) => {
        // TODO: 根据后端返回的状态码做相应的处理
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.errno === 0) {
            responseDate = res.data;
          } else {
            reject(res.data);
          }
        } else {
          reject({
            errno: -1,
            errmsg: res.errMsg
          });
        }
      },
      fail: () => {
        reject({
          errno: -1,
          errmsg: '网络不给力，请检查你的网络设置~'
        });
      },
      complete: (data) => {
        resolve(responseDate);
        hideLoading();
      }
    });
  });
}

const http = {
  get: <T>(api: string, params: any) =>
    baseRequest(RequestMethod.GET, api, {
      ...getCommonParams(),
      ...params
    }) as Http.Response<T>,
  post: <T>(api: string, params: any) =>
    baseRequest(RequestMethod.POST, api, {
      ...getCommonParams(),
      ...params
    }) as Http.Response<T>
};

export default http;
