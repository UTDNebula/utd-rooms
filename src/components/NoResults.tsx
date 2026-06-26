import UTDRoomsShrug from './UTDRoomsShrug';

export default function NoResults() {
  return (
    <div className="w-full flex flex-col items-center py-12">
      <UTDRoomsShrug className="w-1/2 max-w-sm scale-150 stroke-haiti dark:stroke-white" />
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        <h1 className="font-display font-bold text-xl sm:text-3xl">
          No results found
        </h1>
        <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400">
          Try removing some filters!
        </p>
      </div>
    </div>
  );
}
