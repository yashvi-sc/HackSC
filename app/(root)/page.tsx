import TTSButton from '@/components/TTSButton';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center bg-white rounded-lg shadow-lg p-10 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Home Page</h1>
        
        <div className="space-x-4">
          {/* <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">
            Sign In
          </Button>
          <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition">
            Sign Up
          </Button> */}
          <TTSButton label="Sign In" />
          <TTSButton label="Sign Up" />
        </div>
      </div>
    </div>
  );
}