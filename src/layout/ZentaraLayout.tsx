import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ZentaraLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

export default ZentaraLayout;
