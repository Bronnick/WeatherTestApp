import { HttpEvent, HttpInterceptorFn, HttpParams, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

type CacheEntry = {
  response: HttpEvent<unknown>
  timestamp: number
}

const cache = new Map<string, CacheEntry>()

const CACHE_DURATION_MS = 10 * 60 * 1000

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const generateCacheKey = (url: string, params: HttpParams): string => {
    const paramString = params.keys()
      .filter(key => key !== 'appid')
      .map(key => `${key}=${params.get(key)?.trim().toLowerCase()}`)
      .join('&')
    return paramString ? `${url}?${paramString}` : url
  }

  if (req.method !== 'GET') {
    return next(req)
  }

  const cacheKey = generateCacheKey(req.url, req.params)

  const cachedResponse = cache.get(cacheKey)
  if (cachedResponse) {
    const isExpired = (Date.now() - cachedResponse.timestamp) > CACHE_DURATION_MS
    if (!isExpired) {
      console.log("cache: " + cacheKey)
      return of(cachedResponse.response)
    } else {
      cache.delete(cacheKey)
    }
  }

  return next(req).pipe(
    tap(response => {
      if (response instanceof HttpResponse) {
        cache.set(cacheKey, {
          response,
          timestamp: Date.now()
        })
      }
    })
  )
};
