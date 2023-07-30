import Image from "next/image";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import Herosection from "@/components/homePage/Herosection";
import Problemsection from "@/components/homePage/Problemsection";
import Benefitsection from "@/components/homePage/Benefitsection";
import Reviewsection from "@/components/homePage/Reviewsection";
import Pricesection from "@/components/homePage/Pricesection";
import Questionsection from "@/components/homePage/Questionsection";
import Lastsection from "@/components/homePage/Lastsection";
import Footer from "@/components/homePage/Foooter";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const imb_plex_sans_thai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["100", "200", "400", "600"],
});

export default function Home() {
  return (
    <main className={cn(imb_plex_sans_thai.className)}>
      <Navbar />
      <Herosection isLoggedIn={false} />

      <Problemsection />
      <Benefitsection />
      <Reviewsection />
      <Pricesection />
      <Questionsection />
      <Lastsection isLoggedIn={false} />
      <Footer />
    </main>
  );
}
