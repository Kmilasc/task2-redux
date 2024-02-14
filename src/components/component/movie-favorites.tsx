import { add } from "@/stores/cart-list.store";
import { Button } from "../ui/button";
import { inc } from "@/stores/cart-pricing.store";

interface MovieFavoritesProps {
    id: string;
    title: string;
    description: string;
    img: string;
    price: number;
}

export function MovieFavorites({ title, description, img, id, price }: MovieFavoritesProps) {
  return (
    <div className="flex items-start gap-10">
      <div className="aspect-poster w-[200px] overflow-hidden rounded-lg">
        <img
          alt="Film poster"
          className="aspect-video overflow-hidden rounded-lg object-cover object-center border h-225 w-100"
          src={img}
        />
      </div>
      <div className="grid gap-4 w-3/5">
        <h2 className="text-2xl font-bold leading-none">{title}</h2>
        <p className="text-sm leading-none w-3/4 text-justify">{description}</p>
      </div>
      <div className="flex items-start ml-auto">
        <Button className="self-start" size="sm" onClick={() => {
            add(id)
            inc(price)
          }}>
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}