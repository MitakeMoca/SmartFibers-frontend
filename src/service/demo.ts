import axios from '@/utils/axios'

export function handleImage(params: FormData) {
    console.log(`output->params`,params)
    return axios.post('/demo/predict', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
    })
}