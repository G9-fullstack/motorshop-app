export default function PlaceholderItem() {
  return (
    <div className="space-y-6 group w-80 min-w-[20rem]">
      <div className="w-full h-80 bg-contain bg-gray-5 relative border-2 border-transparent animate-pulse transition-all duration-500 rounded">
        <div className="bg-gray-300 w-full h-full rounded" />
      </div>
      <div className="space-y-6 animate-pulse transition-all duration-500">
        <div className="h-4 bg-gray-300 w-3/4 rounded" />
        <div className="h-3 bg-gray-300 w-full rounded" />
        <div className="space-x-2 flex items-center">
          <div className="bg-gray-300 w-11 h-11 rounded-full" />
          <div className="h-4 bg-gray-300 w-16 rounded" />
        </div>
        <div className="flex items-center justify-between flex-row">
          <div className="flex flex-1 space-x-4 flex-row">
            <div className="h-5 bg-gray-300 w-16 rounded" />
            <div className="h-5 bg-gray-300 w-12 rounded" />
          </div>
          <div className="h-6 bg-gray-300 w-20 rounded" />
        </div>
      </div>
    </div>
  )
}