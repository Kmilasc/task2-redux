import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useMovies } from "@/hooks/useMovies"
import { remove, useCartList } from "@/stores/cart-list.store"
import { dec, useCartPricing } from "@/stores/cart-pricing.store"
import { Link } from "@tanstack/react-router"

export function CheckoutItems() {
  const { data = [] } = useMovies()
  const list = useCartList()
  const moviesOnCart = data?.filter(({ id }) => list.includes(id))
  const { shipping, subTotal, total } = useCartPricing()

  return (
    <div className="flex flex-1 flex-col p-14 gap-4 lg:gap-8">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex flex-col flex-1 gap-10">
          {moviesOnCart.length === 0 && (
            <div className="flex flex-col items-center gap-4 flex-1">
              <h2 className="text-2xl font-bold leading-none">Carrinho vazio</h2>
              <Link to="/">
                <Button className="w-full" size="lg" variant="default">
                  Ver filmes
                </Button>
              </Link>
            </div>
          )}
          {moviesOnCart.map(({ id, img, title, price }) => (
            <div className="flex flex-col lg:flex-row items-start gap-10">
              <div className="aspect-poster overflow-hidden rounded-lg">
                <img
                  alt="Film poster"
                  className="aspect-video overflow-hidden rounded-lg object-cover object-center border h-[400px] w-[260px]"
                  height="400"
                  src={img}
                  width="260"
                />
              </div>
              <div className="flex-row gap-4 w-3/5">
                <h2 className="text-2xl font-bold leading-none">{title}</h2>
                <div><strong>Preço:</strong> R$ {price.toFixed(2)}</div>
                <Button className="self-start" size="sm" variant="destructive" onClick={() => {
                    remove(id);
                    dec(price);
                  }}>
                  Remover do carrinho
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Card className="bg-transparent shadow-none p-0 self-center md:self-start">
          <CardHeader>
            <CardTitle>Resumo do pedido</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center">
              <div>Subtotal</div>
              <div className="ml-auto">R$ {subTotal.toFixed(2)}</div>
            </div>
            <div className="flex items-center">
              <div>Frete</div>
              <div className="ml-auto">R$ {shipping.toFixed(2)}</div>
            </div>
            <Separator />
            <div className="flex items-center font-medium">
              <div>Total</div>
              <div className="ml-auto">R$ {total.toFixed(2)}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              Finalizar compra
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
