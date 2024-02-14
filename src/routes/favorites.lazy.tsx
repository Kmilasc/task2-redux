import { Loader } from '@/components/component/loader';
import { MovieFavorites } from '@/components/component/movie-favorites';
import { useMovies } from '@/hooks/useMovies';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/favorites')({
  component: Favorites,
})

function Favorites() {
  const { data, isFetching } = useMovies()
  const favoritedMovies = data?.filter(movie => movie.isFavorite)

  if(isFetching || !favoritedMovies){
    return <Loader />
  }

  return (
    <div className="space-y-6 p-14 h-full">
      {favoritedMovies.map(({id, ...movie}) => (
        <MovieFavorites key={id} id={id} {...movie} />
      ))}
    </div>
  )
}