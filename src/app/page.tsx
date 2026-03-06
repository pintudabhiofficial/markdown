import { MarkdownEditor } from "../components/MarkdownEditor";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";

export default function Home() {
  return (
    <div id="page-container" className="h-screen overflow-y-auto overflow-x-hidden">
      <MarkdownEditor />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
