import {useQuery} from '@tanstack/react-query';
import { api } from '@/services/api';

interface IFetchMovies{
documents: {
    name: string;
    fields: {
        title: {
            stringValue: string;
        };
        isFavorite: {
            booleanValue: boolean;
        };
        img: {
            stringValue: string;
        };
        description: {
            stringValue: string;
        };
        price: {
            integerValue: number;
        };
    };
    createTime: string;
    updateTime: string;
}[];
}

const queryFn = () => api.get<IFetchMovies>('/Movies').then(({ data })=> data.documents.map(({fields, name}) => ({
    id: name.split('/').pop()!,
    title: fields.title.stringValue,
    isFavorite: fields.isFavorite.booleanValue,
    img: fields.img.stringValue,
    description: fields.description.stringValue,
    price: fields?.price?.integerValue ? Number(fields.price.integerValue) : 0
})))

export type IMovie = Awaited<ReturnType<typeof queryFn>>[0]

  
export function useMovies() {
    return useQuery({
        queryKey: ['movies'],
        queryFn,
    })
}