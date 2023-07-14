import axios from 'axios'

/**
 * Config global for axios/django
 */
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true
export default axios;