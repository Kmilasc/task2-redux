import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { api } from "@/services/api";
import { SVGProps } from "react";
import { IMovie } from "@/hooks/useMovies";
import { add } from "@/stores/cart-list.store";
import { inc } from "@/stores/cart-pricing.store";

interface MovieHomeProps {
    id: string;
    title: string;
    description: string;
    img: string;
    isFavorite: boolean;
    price: number;
}

export function MovieHome({ title, description, img, isFavorite, id, price }: MovieHomeProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['movies', 'add-favorite'],
    mutationFn: () => api.patch(`/Movies/${id}`, {fields: {isFavorite: {booleanValue: !isFavorite}}}, {
        params: {
          'updateMask.fieldPaths': 'isFavorite',
          'currentDocument.exists': true
        },
      }).then(({ data }) => data),
    onSuccess: () => {
      queryClient.setQueryData<IMovie[]>(['movies'], (data) => {
        if (!data) return data;

        return data.map(({ id: currentId, ...data }) => currentId === id ? {
          ...data,
          id: currentId,
          isFavorite: !isFavorite
        } : { id: currentId, ...data })
      })
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <img
          alt="Cover image"
          className="aspect-video overflow-hidden rounded-lg object-cover object-center border h-[400px] w-[260px]"
          height="400"
          src={img}
          width="260"
      />
      <div className="flex flex-col gap-1.5">
        <div>
          <div className="flex flex-row items-center gap-3">
              <h1 className="font-semibold text-2xl line-clamp-1">{title}</h1>
              <StarIcon onClick={() => mutate()} className="w-5 h-5 hover:fill-yellow-300 data-[is-favorite=true]:fill-yellow-300" data-is-favorite={isFavorite} />
          </div>
            <p className="text-justify md:line-clamp-6 md:h-[150px]">{description}</p>
        </div>
        <div><strong>Preço:</strong> R$ {price.toFixed(2)}</div>
        <Button className="self-start" variant="outline" onClick={() => {
            add(id)
            inc(price)
          }}>
            Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
    
  }
  