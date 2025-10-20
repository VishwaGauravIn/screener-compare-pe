import { ComparePEApp } from "@/components/compare-pe-app";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col justify-between">
      <ComparePEApp />
      <Footer />
    </main>
  );
}
