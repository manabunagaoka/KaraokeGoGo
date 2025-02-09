export default function RootLoading() {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          <div className="text-accent">Loading KaraokeGoGo...</div>
        </div>
      </div>
    );
  }