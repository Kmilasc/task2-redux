import { createRootRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Button } from '@/components/ui/button';
import { markAsWentToHome, useCartUserAction } from '@/stores/cart-user-action.store';
import { useEffect } from 'react';

export const Route = createRootRoute({
  component: () => {
    const { keepBuying } = useCartUserAction()
    const navigate = useNavigate()

    useEffect(() => {
      markAsWentToHome()
      keepBuying && navigate({
        to: '/',
      })
    }, [keepBuying])
    
    return (
    <>
      <header className="flex items-center h-14 border-b px-6 lg:h-[60px] gap-4 dark:border-gray-800">
        <div className="flex items-center gap-2 flex-1">
          <MovieFilterIcon className="h-6 w-6" />
          <Link className="font-bold" href="#">
            Filmoteca
          </Link>
        </div>
        <Button className="rounded-full border w-8 h-8" size="icon" variant="ghost">
          <Link to="/favorites">
          <FavoriteBorderIcon className="w-4 h-4"/>
          </Link>
          <span className="sr-only">Adicionar aos favoritos</span>
        </Button>
        <Button className="rounded-full border w-8 h-8" size="icon" variant="ghost">
          <Link to="/checkout">
          <ShoppingBasketIcon className="w-4 h-4" />
        </Link>
          <span className="sr-only">Adicionar ao carrinho</span>
        </Button>
      </header>
      <hr />
      <Outlet />
      <footer className="flex items-center h-14 border-t px-6 gap-4 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">Filmoteca. Todos os direitos reservados.</p>
        <nav className="ml-auto flex items-center gap-4">
          <Link className="text-sm font-semibold" href="#">
            Termos
          </Link>
          <Link className="text-sm font-semibold" href="#">
            Privacidade     
          </Link>
          <Link className="text-sm font-semibold" href="#">
            Ajuda
          </Link>
        </nav>
      </footer>
    </>
  )},
})