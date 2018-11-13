import * as registryUrl from 'registry-url'
import * as got from 'got'

export function searchNpm (text: string, opt: {size?: number, from?: number, [idx: string]: any} = {}) {
  const elseEmpty = (k: string) => opt[k] ? `${k}=${opt[k]}` : ''
  
  const url = registryUrl() + `-/v1/search?text=${encodeURIComponent(text).replace('%2B', '+')}&` + Object.keys(opt).map(elseEmpty).join('&')
  return got(url, {json: true})
    .then((res: any) => res.body)
    .then(({objects = []}) => objects.map((obj: any) => obj.package))
}
