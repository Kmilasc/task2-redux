import { createLazyFileRoute } from '@tanstack/react-router';
import { CheckoutItems } from '@/components/component/checkout';

export const Route = createLazyFileRoute('/checkout')({
  component: Checkout,
})

function Checkout() {
  return (
    <div className='flex flex-col flex-1'>
      <CheckoutItems />
    </div>
  )
}