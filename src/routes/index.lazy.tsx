import { createLazyFileRoute } from '@tanstack/react-router';
import { MovieHome } from '@/components/component/movie-home';
import { Loader } from '@/components/component/loader';
import { useMovies } from '@/hooks/useMovies';

export const Route = createLazyFileRoute('/')({
  component: Index,
})


function Index() {
  const { data, isFetching } = useMovies()

  if(isFetching || !data){
    return <Loader />
  }

  return (
    <div key="1" className="flex flex-col min-h-screen">
      <main className="flex-1 p-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
        {data.map(({id, ...movie}) => (
          <MovieHome key={id} id={id} {...movie} />
        ))}
      </main>
    </div>
  )
}
