import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-medium text-zinc-950 max-w-md mx-auto mb-8">
            We can't find the page you are looking for.
          </p>
          <Button asChild className="bg-zinc-950 hover:bg-[#FF0102] transition-colors inline-flex items-center rounded-full py-7 px-16 text-base font-medium">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </main>

    </div>
  );
};

export default NotFound;
