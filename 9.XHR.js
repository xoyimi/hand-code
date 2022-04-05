/* AJAX: Async JavaScript And XML */

/* 手动封装XHR */

export function request(url, options) {
  const xhr = new XMLHttpRequest()
  const method = options?.method || 'GET'
  const responseType = options?.responseType || ''
  const withCredentials = options?.withCredentials || false

  const body = options?.body || null
  if (method === 'GET' && body !== null) throw new Error('GET请求不能有body')
  xhr.open(method, url)

  xhr.responseType = responseType
  xhr.withCredentials = withCredentials
  xhr.send(body)

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      const status = xhr.status
      if ((status >= 200 && status < 300) || status === 304) {
        resolve(xhr.responseText)
      }
      reject(new Error(xhr.statusText))
    }
  })
}
