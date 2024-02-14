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
    <div className="flex flex-col p-14 gap-4 lg:gap-8 h-full">
      <div className="grid items-start gap-4 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]">
        {moviesOnCart.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold leading-none">Carrinho vazio</h2>
            <Link to="/">
              <Button className="w-full" size="lg" variant="default">
                Ver filmes
              </Button>
            </Link>
          </div>
        )}
        {moviesOnCart.map(({ id, img, title, price }) => (
          <div className="flex items-start gap-10">
            <div className="aspect-poster w-[200px] overflow-hidden rounded-lg">
              <img
                alt="Film poster"
                className="aspect-video overflow-hidden rounded-lg object-cover object-center border h-250 w-100"
                src={img}
              />
            </div>
            <div className="flex-row gap-4 w-3/5">
              <h2 className="text-2xl font-bold leading-none">{title}</h2>
              <div>Preço: R$ {price.toFixed(2)}</div>
              <Button className="self-start" size="sm" variant="destructive" onClick={() => {
                  remove(id);
                  dec(price);
                }}>
                Remover do carrinho
              </Button>
            </div>
          </div>
        ))}
        <Card className="bg-transparent shadow-none p-0">
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
