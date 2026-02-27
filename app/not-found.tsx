import Link from "next/link";
import { Home } from "lucide-react";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Page Not Found | Caliber Business Resource",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-6xl font-bold text-primary">404</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>

        <p className="text-muted-foreground mb-8 text-lg">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <BackButton />
        </div>
      </div>
    </div>
  );
}