import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/filmoteca-14683/databases/(default)/documents',
})
