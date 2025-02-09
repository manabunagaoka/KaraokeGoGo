export default function Loading() {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          <div className="text-accent text-lg">Loading admin dashboard...</div>
        </div>
        
        {/* Current system info */}
        <div className="mt-8 text-sm text-gray-400">
          <p>Current Date and Time (UTC): {new Date().toISOString().slice(0, 19).replace('T', ' ')}</p>
        </div>
      </div>
    );
  }