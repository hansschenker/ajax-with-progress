import { ajax as rxjsAjax, AjaxResponse, AjaxError, AjaxConfig } from 'rxjs/ajax';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { PartialObserver } from 'rxjs';

/**
 * Helper function for GET requests with optional download progress tracking.
 *
 * @param url - The URL to request.
 * @param headers - Request headers.
 * @param includeDownloadProgress - If true, enables download progress events.
 * @param progressSubscriber - A custom observer to handle progress events.
 * @returns An Observable emitting the final response of type T.
 */
export function ajaxGet<T>(
  url: string,
  headers: Readonly<Record<string, any>> = {},
  includeDownloadProgress: boolean = false,
  progressSubscriber?: PartialObserver<ProgressEvent>
): Observable<T | AjaxError> {
  const config: AjaxConfig = {
    url,
    method: 'GET',
    headers,
    includeDownloadProgress: includeDownloadProgress || !!progressSubscriber,
    progressSubscriber,
  };

  return rxjsAjax(config).pipe(
    map((response) => (response as AjaxResponse<T>).response),
    catchError((error: AjaxError) => {
      console.error('ajaxGet error:', error);
      return of(error);
    })
  );
}

/**
 * Helper function for POST requests with optional download progress tracking.
 *
 * @param url - The URL to request.
 * @param body - The request payload.
 * @param headers - Request headers.
 * @param includeDownloadProgress - If true, enables download progress events.
 * @param progressSubscriber - A custom observer to handle progress events.
 * @returns An Observable emitting the final response of type T.
 */
export function ajaxPost<T>(
  url: string,
  body: any,
  headers: Readonly<Record<string, any>> = {},
  includeDownloadProgress: boolean = false,
  progressSubscriber?: PartialObserver<ProgressEvent>
): Observable<T | AjaxError> {
  const config: AjaxConfig = {
    url,
    method: 'POST',
    body,
    headers,
    includeDownloadProgress: includeDownloadProgress || !!progressSubscriber,
    progressSubscriber,
  };

  return rxjsAjax(config).pipe(
    map((response: AjaxResponse<any>) => response.response as T),
    catchError((error: AjaxError) => {
      console.error('ajaxPost error:', error);
      return of(error);
    })
  );
}

/**
 * Helper function for DELETE requests with optional download progress tracking.
 *
 * @param url - The URL to request.
 * @param headers - Request headers.
 * @param includeDownloadProgress - If true, enables download progress events.
 * @param progressSubscriber - A custom observer to handle progress events.
 * @returns An Observable emitting the final response of type T.
 */
export function ajaxDelete<T>(
  url: string,
  headers: Readonly<Record<string, any>> = {},
  includeDownloadProgress: boolean = false,
  progressSubscriber?: PartialObserver<ProgressEvent>
): Observable<T | AjaxError> {
  const config: AjaxConfig = {
    url,
    method: 'DELETE',
    headers,
    includeDownloadProgress: includeDownloadProgress || !!progressSubscriber,
    progressSubscriber,
  };

  return rxjsAjax(config).pipe(
    map((response: AjaxResponse<unknown>) => response as AjaxResponse<T>),
    map((response: AjaxResponse<unknown>) => response as AjaxResponse<T>),
    map((response: AjaxResponse<unknown>) => (response as AjaxResponse<T>).response),
    catchError((error: AjaxError) => {
      console.error('ajaxDelete error:', error);
      return of(error);
    })
  );
}

/**
 * Helper function for GET JSON requests with optional download progress tracking.
 *
 * @param url - The URL to request.
 * @param headers - Request headers.
 * @param includeDownloadProgress - If true, enables download progress events.
 * @param progressSubscriber - A custom observer to handle progress events.
 * @returns An Observable emitting the parsed JSON response of type T.
 */
export function ajaxGetJSON<T>(
  url: string,
  headers: Readonly<Record<string, any>> = {},
  includeDownloadProgress: boolean = false,
  progressSubscriber?: PartialObserver<ProgressEvent>
): Observable<T | AjaxError> {
  const config: AjaxConfig = {
    url,
    method: 'GET',
    headers,
    responseType: 'json',
    includeDownloadProgress: includeDownloadProgress || !!progressSubscriber,
    progressSubscriber,
  };

  return rxjsAjax(config).pipe(
    map((response: AjaxResponse<unknown>) => (response as AjaxResponse<T>).response),
    catchError((error: AjaxError) => {
      console.error('ajaxGetJSON error:', error);
      return of(error);
    })
  );
}
