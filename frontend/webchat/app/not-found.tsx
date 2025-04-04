import NotFound from "@/components/NotFound";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="container h-[calc(100vh-268px)]">
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
