import UTDRoomsShrug from './UTDRoomsShrug';

export default function NoResults() {
  return (
    <div className="w-full flex flex-col items-center py-8">
      <UTDRoomsShrug className="w-1/2 max-w-sm scale-150 stroke-black dark:stroke-white" />
      <h1 className="font-display text-3xl">No results found</h1>
    </div>
  );
}
