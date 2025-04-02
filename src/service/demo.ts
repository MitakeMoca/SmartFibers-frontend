import axios from '@/utils/axios'

export function handleImage(params: FormData) {
    console.log(`output->params`,params)
    return axios.post('/demo/handle', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
    })
}