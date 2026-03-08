import { Linkedin, Bot } from "lucide-react";
import { SiOpenai, SiAnthropic, SiPerplexity, SiX, SiGooglegemini, SiGoogle } from "react-icons/si";

/* ── Reusable layout helpers ── */
function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-white/[0.05] py-12">
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-slate-100 mb-4">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-slate-200 mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-400 leading-relaxed mb-3">{children}</p>;
}
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[11px] bg-white/[0.07] text-indigo-300 px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-[#080b10] text-slate-300 border-t border-white/[0.06]">

      {/* ══ HERO BAND ══ */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
            <span className="text-white font-bold">M</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent leading-tight">
            How a Plain-Text Notation Created in 2004 Became the Writing Standard for the Entire Web
          </h1>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
          A practical, no-fluff guide covering syntax, editors, file handling, conversion workflows, and the role of lightweight formatting in modern publishing and AI systems.
        </p>

        {/* Timeline */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ["2002", "Aaron Swartz creates atx"],
            ["2004", "Gruber releases v1.0.1 & Markdown.pl"],
            ["2012", "Jeff Atwood launches standardisation effort"],
            ["2014", "CommonMark specification published"],
            ["2016", "IETF registers text/markdown (RFC 7763 & 7764)"],
            ["2017", "GitHub publishes formal GFM spec"],
            ["2024", "CommonMark v0.31.2 released"],
          ].map(([year, label]) => (
            <div key={year} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1">
              <span className="text-indigo-400 text-xs font-bold">{year}</span>
              <span className="text-slate-400 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTION 1 · History ══ */}
      <Section id="history">
        <H2>The Problem That Started It All</H2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <P>In 2003, John Gruber was frustrated. He wanted to write for the web, but HTML felt like filling out tax forms. Every paragraph needed opening and closing &lt;p&gt; tags. Every link required an &lt;a href=""&gt; wrapper. The result was technically correct but unreadable in source form. Gruber, a blogger and former Apple developer running Daring Fireball, wanted something different: a way to compose web content that looked clean before rendering, not just after.</P>
            <P>Working with programmer Aaron Swartz — who had created the atx structured text format in 2002 — Gruber developed a plain-text writing system that launched in March 2004. The core principle was radical in its simplicity: the source document should be publishable as-is, without looking like it had been marked up with tags or formatting instructions. Asterisks around a word should look like emphasis. Dashes at the start of lines should look like a list.</P>
          </div>
          <div>
            <P>That project became a lightweight markup language built from punctuation characters, inspired by the conventions people already used in plain-text email. Two decades later, the format powers GitHub's documentation layer, structures AI-generated content from ChatGPT to Claude, and remains the preferred writing tool for millions of developers, technical writers, and content teams worldwide.</P>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mt-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">A Note on Naming</p>
              <p className="text-xs text-slate-400 leading-relaxed">The name is a deliberate pun. HTML is a "markup" language — heavy, tag-dense, verbose. Gruber's creation is a "markdown" — lighter, simpler, closer to human-readable text. One word, capitalised. The two-word variant ("mark down") is a common misspelling.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ══ SECTION 2 · Syntax Reference ══ */}
      <Section id="syntax">
        <H2>Syntax Reference: What You Actually Need to Know</H2>
        <P>Forget memorising every edge case. The core markdown syntax fits on a single screen, and that deliberate minimalism is the entire point. Below is a working reference for the constructs you will use daily, whether you're learning markdown formatting for the first time or refreshing your knowledge of a specific element.</P>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {/* Headings */}
          <div>
            <H3>Headings</H3>
            <P>Six levels, controlled by the number of # characters at the start of a line. One hash produces an H1, six produces an H6. The older setext style — underlining text with = or - characters — still works but is rarely used outside legacy documents.</P>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs space-y-1 border border-white/[0.05]">
              {["# Page Title", "## Section", "### Subsection", "#### Detail Level"].map(t => (
                <div key={t} className="text-indigo-300">{t}</div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">On GitHub and GitLab, headings automatically generate anchor IDs for deep-linking. Heading hierarchy matters for both readers and search engine crawlers.</p>
          </div>

          {/* Emphasis */}
          <div>
            <H3>Emphasis, Strong Text & Strikethrough</H3>
            <P>Single asterisks or underscores produce italic text. Double markers produce bold. Triple markers combine both. GFM adds <Pill>~~strikethrough~~</Pill> with double tildes, and supports subscript and superscript through inline HTML.</P>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs space-y-1 border border-white/[0.05]">
              {["*italic*  or  _italic_", "**bold**  or  __bold__", "***bold italic***", "~~strikethrough~~"].map(t => (
                <div key={t} className="text-indigo-300">{t}</div>
              ))}
            </div>
          </div>

          {/* Links & Images */}
          <div>
            <H3>Links and Images</H3>
            <P>Inline links use <Pill>[visible text](URL)</Pill>. Reference-style links keep source cleaner in link-heavy documents. Images follow the same pattern with an exclamation prefix. Always write meaningful alt text — it serves accessibility, image search indexing, and fallback display simultaneously.</P>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs space-y-1 border border-white/[0.05]">
              {["[Link text](https://url)", "![alt text](image.jpg)", "[ref text][id]", "[id]: https://url"].map(t => (
                <div key={t} className="text-indigo-300">{t}</div>
              ))}
            </div>
          </div>

          {/* Lists */}
          <div>
            <H3>Lists: Ordered, Unordered & Task-Based</H3>
            <P>Unordered lists accept -, *, or + as markers. Ordered lists use any number followed by a period — the actual values are ignored. Nesting is controlled by indentation. GFM extends with task checkboxes: <Pill>- [ ]</Pill> incomplete and <Pill>- [x]</Pill> done.</P>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs space-y-1 border border-white/[0.05]">
              {["- Unordered item", "1. Ordered item", "  - Nested item", "- [x] Done", "- [ ] Pending"].map(t => (
                <div key={t} className="text-indigo-300">{t}</div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div>
            <H3>Code: Inline Spans and Fenced Blocks</H3>
            <P>Backticks create inline code spans for referencing function names like <Pill>console.log()</Pill> within a sentence. Triple backticks open a fenced code block. Adding a language identifier after the opening backticks enables syntax highlighting on GitHub, GitLab, VS Code, and most static site generators.</P>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs space-y-1 border border-white/[0.05]">
              {["`inline code`", "```javascript", "function greet() {", "  return 'hello';", "}", "```"].map(t => (
                <div key={t} className="text-indigo-300">{t}</div>
              ))}
            </div>
          </div>

          {/* Blockquotes + Tables */}
          <div>
            <H3>Blockquotes, Tables & Escaping</H3>
            <P>Blockquotes use the <Pill>&gt;</Pill> character, borrowed from email quoting conventions. Tables use pipe characters with a dash-row header separator — a GFM extension now supported almost universally. To display literal punctuation, prefix with a backslash: <Pill>\*</Pill>, <Pill>\_</Pill>, <Pill>\#</Pill>.</P>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs space-y-1 border border-white/[0.05]">
              {["> Blockquote text", "| Col A | Col B |", "|-------|-------|", "| value | value |", "\\* escaped asterisk"].map(t => (
                <div key={t} className="text-indigo-300">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══ SECTION 3 · Cheat Sheet Tables ══ */}
      <Section id="cheatsheet">
        <H2>The Only Cheat Sheet You Need to Bookmark</H2>
        <P>Every element below is part of John Gruber's original design document and works across all compliant applications. Print this, tape it to your monitor, and revisit it for the first two weeks — after that the syntax becomes invisible.</P>

        {/* Core Syntax Table */}
        <H3>Core Syntax — Universally Supported</H3>
        <p className="text-xs text-slate-500 mb-4">These constructs render identically on GitHub, GitLab, Stack Overflow, Obsidian, VS Code, and every CommonMark-compliant processor.</p>
        <div className="overflow-x-auto rounded-xl border border-white/[0.07] mb-8">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.05] text-slate-400 text-left">
                <th className="px-4 py-3 font-semibold">Element</th>
                <th className="px-4 py-3 font-semibold">What You Type</th>
                <th className="px-4 py-3 font-semibold">What It Produces</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["Heading H1", "# Page Title", "Largest heading. Use once per document."],
                ["Heading H2", "## Section Name", "Section divider. Primary content structure."],
                ["Heading H3", "### Subsection", "Detail level beneath an H2."],
                ["Bold", "**important text**", "Strong emphasis. Rendered as <strong>."],
                ["Italic", "*subtle emphasis*", "Light emphasis. Rendered as <em>."],
                ["Bold + Italic", "***critical text***", "Combined strong and light emphasis."],
                ["Blockquote", "> quoted passage", "Indented block with left border."],
                ["Ordered List", "1. First item", "Numbered sequence. Actual digits ignored."],
                ["Unordered List", "- List item", "Bullet point. Also accepts * or + markers."],
                ["Inline Code", "`variable_name`", "Monospaced span within a sentence."],
                ["Horizontal Rule", "---", "Full-width divider line. Also *** or ___."],
                ["Link", "[text](https://url)", "Clickable hyperlink with visible anchor text."],
                ["Image", "![alt text](image.jpg)", "Embedded image. Alt text is mandatory."],
              ].map(([el, syntax, desc]) => (
                <tr key={el} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5 text-slate-300 font-medium">{el}</td>
                  <td className="px-4 py-2.5 font-mono text-indigo-300 bg-black/20">{syntax}</td>
                  <td className="px-4 py-2.5 text-slate-500">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Extended Syntax Table */}
        <H3>Extended Syntax — Platform-Dependent</H3>
        <p className="text-xs text-slate-500 mb-4">These features go beyond the original specification. GFM and the Extra variant support most of them — test before relying on them in cross-platform documentation.</p>
        <div className="overflow-x-auto rounded-xl border border-white/[0.07] mb-8">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.05] text-slate-400 text-left">
                <th className="px-4 py-3 font-semibold">Element</th>
                <th className="px-4 py-3 font-semibold">What You Type</th>
                <th className="px-4 py-3 font-semibold">Supported By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["Table", "| Col A | Col B | with --- separator", "GFM, Extra, most modern parsers"],
                ["Fenced Code Block", "``` language\\ncode\\n```", "GFM, Extra, CommonMark"],
                ["Strikethrough", "~~deleted text~~", "GFM, Discord"],
                ["Task List", "- [x] Done  /  - [ ] Pending", "GFM (GitHub issues and PRs)"],
                ["Footnote", "Text [^1]  then  [^1]: Note", "GFM, Extra, Pandoc"],
                ["Definition List", "Term\\n: Definition text", "Extra, Pandoc"],
                ["Emoji Shortcode", ":fire: or :thumbsup:", "GitHub, Discord, Slack"],
                ["Highlight", "==highlighted words==", "Some editors (not GFM)"],
                ["Subscript", "H~2~O", "Pandoc, some Extra implementations"],
                ["Superscript", "X^2^", "Pandoc, some Extra implementations"],
                ["Alert / Callout", "> [!WARNING] Urgent info", "GitHub only"],
                ["Math (inline)", "$E = mc^2$", "GitHub, Pandoc, Obsidian"],
                ["Math (block)", "$$\\nequation\\n$$", "GitHub, Pandoc, Obsidian"],
                ["Mermaid Diagram", "```mermaid\\nflowchart LR\\n```", "GitHub, GitLab"],
              ].map(([el, syntax, support]) => (
                <tr key={el} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5 text-slate-300 font-medium">{el}</td>
                  <td className="px-4 py-2.5 font-mono text-violet-300 bg-black/20">{syntax}</td>
                  <td className="px-4 py-2.5 text-slate-500">{support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Keyboard Shortcuts */}
        <H3>Keyboard Shortcuts Worth Knowing</H3>
        <p className="text-xs text-slate-500 mb-4">These shortcuts cut formatting time in half and work in GitHub's browser-based editing interface and most dedicated desktop applications.</p>
        <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.05] text-slate-400 text-left">
                <th className="px-4 py-3 font-semibold">Action</th>
                <th className="px-4 py-3 font-semibold">Mac</th>
                <th className="px-4 py-3 font-semibold">Windows / Linux</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["Bold selected text", "Cmd + B", "Ctrl + B"],
                ["Italicise selected text", "Cmd + I", "Ctrl + I"],
                ["Insert link", "Cmd + K", "Ctrl + K"],
                ["Insert code span", "Cmd + E", "Ctrl + E"],
                ["Toggle preview (VS Code)", "Cmd + Shift + V", "Ctrl + Shift + V"],
                ["Side-by-side preview (VS Code)", "Cmd + K then V", "Ctrl + K then V"],
                ["Quote selected text (GitHub)", "R (with text highlighted)", "R (with text highlighted)"],
                ["Indent line (GitHub)", "Tab", "Tab"],
                ["Outdent line (GitHub)", "Shift + Tab", "Shift + Tab"],
              ].map(([action, mac, win]) => (
                <tr key={action} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5 text-slate-300">{action}</td>
                  <td className="px-4 py-2.5 font-mono text-emerald-400">{mac}</td>
                  <td className="px-4 py-2.5 font-mono text-emerald-400">{win}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ══ SECTION 4 · .md File ══ */}
      <Section id="md-file">
        <H2>Understanding the .md File</H2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <P>An .md file is plain text. Nothing more. No binary headers, no proprietary encoding, no vendor lock-in. You can open one in Notepad, Vim, VS Code, or any other text editor on any operating system. This portability is not a minor convenience — it is the reason version control systems like Git can diff, merge, and track changes to documentation with the same precision they apply to source code.</P>
            <P>The file extension .md is the universal standard, though Gruber himself preferred the longer .markdown variant. The IETF formalised the text/markdown media type in RFC 7763, with companion document RFC 7764 registering specific implementation variants. Every major platform — GitHub, GitLab, Bitbucket, Codeberg — renders .md files automatically when you browse a repository.</P>
            <P>The most ubiquitous example is README.md: the file that serves as a project's front door. When teams commit to writing good README documentation, they are investing in the most-read page in their entire codebase. If you maintain open-source projects, your README is your landing page, onboarding guide, and first impression rolled into one file.</P>
          </div>
          <div>
            <H3>Common File Conventions</H3>
            <ul className="space-y-3">
              {[
                [".md / .markdown", "Universal plain-text format (IETF RFC 7763)"],
                ["README.md", "Project front door — the most-read file in any repository"],
                ["CONTRIBUTING.md", "Contribution guidelines for open-source projects"],
                ["CHANGELOG.md", "Version history log, often following Keep a Changelog format"],
                ["docs/", "Folder containing architecture decisions, API references, and onboarding guides"],
              ].map(([name, desc]) => (
                <li key={name} className="flex items-start gap-3">
                  <code className="text-[11px] bg-white/[0.06] text-violet-300 px-2 py-0.5 rounded font-mono flex-shrink-0 mt-0.5">{name}</code>
                  <span className="text-xs text-slate-400 leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ══ SECTION 5 · Converting Formats ══ */}
      <Section id="converting">
        <H2>Converting Between Formats: HTML, PDF, and Back Again</H2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-3">Plain Text → HTML</h3>
            <p className="text-xs text-slate-400 leading-relaxed">The original purpose of Gruber's Perl script was converting markdown to HTML — take readable plain text and output valid, well-formed HTML. A heading becomes an &lt;h2&gt; tag. A bold word becomes a &lt;strong&gt; tag. The processor handles character escaping automatically, converting bare ampersands and angle brackets to their entity equivalents.</p>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">Inline HTML is also supported. If the notation's syntax doesn't cover what you need — a &lt;details&gt; widget, a &lt;figure&gt; with a caption — write the HTML directly.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-3">HTML → Plain Text</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Tools like Pandoc and Turndown convert existing HTML pages into clean, readable source files. Content migration teams use this when moving from legacy CMS platforms to static site generators like Jekyll or Hugo. AI engineering teams use it when preparing web content for retrieval-augmented generation (RAG) pipelines, where stripping HTML noise and preserving semantic structure produces measurably better retrieval accuracy.</p>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">Mistral recently launched a dedicated API that converts PDF documents into AI-ready structured text, reflecting an industry-wide recognition that lightweight formatting serves machine processing better than raw HTML or PDF markup ever could.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-3">Producing Professional PDFs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">The markdown to PDF pipeline is one of the most requested workflows. Pandoc — created by John MacFarlane, who also leads the CommonMark specification project — is the gold standard. It produces typeset-quality PDFs through LaTeX, Word documents, EPUB files, presentation slides, and dozens of other formats from a single source.</p>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">Simpler alternatives include VS Code extensions, browser print-to-PDF, and dedicated apps like Typora with built-in export. Your source files remain portable and independent of any single vendor regardless of export path.</p>
          </div>
        </div>
      </Section>

      {/* ══ SECTION 6 · Editors ══ */}
      <Section id="editors">
        <H2>Choosing an Editor That Fits Your Workflow</H2>
        <P>Because the format is plain text, any editor technically works. But a purpose-built markdown editor offers live rendering, syntax colouring, export features, and plugin ecosystems that transform the writing experience. Your ideal choice depends on the work: code documentation, long-form prose, or quick notes each call for different tools.</P>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {[
            {
              name: "Visual Studio Code",
              type: "Desktop · Developer-focused",
              desc: "The default choice for developers. Built-in markdown preview pane, extension marketplace, and Git integration make it a natural environment for documentation work alongside code. Press Ctrl+Shift+V to open the preview panel.",
            },
            {
              name: "Mark Text",
              type: "Desktop · Open-source",
              desc: "Suits writers who prefer a distraction-free interface. Open-source under the MIT licence, supports both CommonMark and GFM, and offers a genuine WYSIWYG mode where source transforms into styled text as you type.",
            },
            {
              name: "Obsidian",
              type: "Desktop · Knowledge management",
              desc: "A personal knowledge management system built on a local folder of .md files, with bidirectional linking, graph views, and a thriving plugin ecosystem. No cloud dependency — everything stays on your device.",
            },
            {
              name: "Typora",
              type: "Desktop · WYSIWYG",
              desc: "Clean WYSIWYG with inline rendering — the source transforms as you type, eliminating the need for a separate preview pane. Gruber's own editor of choice is BBEdit on macOS; Typora is the closest cross-platform equivalent.",
            },
            {
              name: "Notion",
              type: "Web · Collaborative",
              desc: "Blends lightweight notation with database and project management features. Team-shared workspaces with formatting support. The collaborative end of the spectrum for organisations that need shared documentation infrastructure.",
            },
            {
              name: "Online / Browser-based",
              type: "Web · Zero-install",
              desc: "When installing software is impractical, writing markdown online removes all setup friction. Open the URL, start typing, see the output. This tool is exactly that — the standard split-pane md live preview pattern: source left, rendered output right.",
            },
          ].map(({ name, type, desc }) => (
            <div key={name} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:border-indigo-500/30 transition-colors">
              <p className="text-sm font-semibold text-slate-200 mb-0.5">{name}</p>
              <p className="text-[11px] text-indigo-400 mb-2">{type}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 7 · Why It Won ══ */}
      <Section id="why">
        <H2>Why This Format Won: The Structural Advantages</H2>
        <P>Plenty of text-to-HTML tools existed before 2004. Setext dates to 1992. Textile and reStructuredText both appeared around 2002. Grutatext and EtText influenced the design. So why did this particular notation, rather than any of those predecessors, become the web's default writing tool?</P>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {[
            {
              title: "Readability as a Design Constraint",
              desc: "The original specification states it explicitly: the source document should be publishable as-is, without looking marked up. Every syntax decision flows from that constraint. Asterisks were chosen because they visually suggest emphasis. Dashes because they visually suggest list items.",
            },
            {
              title: "Zero Tooling Requirements",
              desc: "You need nothing to start writing. No compiler, no runtime, no account, no proprietary application. A text file and a keyboard. The absence of barriers is what allowed adoption to spread virally through developer communities, documentation teams, and eventually into mainstream productivity tools like Notion, Obsidian, and Slack.",
            },
            {
              title: "Version-Control Compatibility",
              desc: "Plain text is the native language of Git. Unlike Word documents or Google Docs exports, .md files produce clean, line-by-line diffs. Teams can review documentation changes in pull requests with the same rigor they apply to code. For organisations that treat documentation as a first-class deliverable, this is transformative.",
            },
            {
              title: "AI & LLM Alignment",
              desc: "ChatGPT, Claude, Gemini, and Mistral all generate structured responses using this notation. A heading (## Section) costs far fewer tokens than its HTML equivalent (<h2>Section</h2>). Across thousands of generated documents, that overhead difference is substantial. The format preserves semantic hierarchy while consuming minimal token budget.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] rounded-xl p-5">
              <p className="text-sm font-semibold text-slate-200 mb-2">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 8 · Specifications ══ */}
      <Section id="specs">
        <H2>Specifications and Variants: Navigating the Ecosystem</H2>
        <P>Gruber's original description was intentionally informal. He deliberately avoided formal standardisation, arguing that different sites and different people have different needs. That philosophy enabled rapid innovation — but also created fragmentation.</P>
        <div className="grid sm:grid-cols-3 gap-6 mt-4 mb-8">
          {[
            {
              name: "CommonMark",
              badge: "v0.31.2 · Jan 2024",
              desc: "The most significant standardisation effort began in 2012, when Jeff Atwood, John MacFarlane, and other contributors set out to resolve ambiguities. After Gruber objected to using his project's name, the initiative was rebranded CommonMark in September 2014. It provides an unambiguous spec, a comprehensive test suite, and a reference implementation. GitHub, GitLab, Reddit, Stack Exchange, Discourse, and Codeberg all build on CommonMark.",
            },
            {
              name: "GitHub Flavored Markdown (GFM)",
              badge: "CommonMark Superset",
              desc: "GFM is a strict CommonMark superset. It follows the base spec exactly and adds four extensions: tables, strikethrough, autolinks, and task lists. GitHub published its formal specification in 2017. GFM has become the reference point for most web-facing implementations because GitHub's dominance in the developer ecosystem makes it the version most people encounter first.",
            },
            {
              name: "Other Variants",
              badge: "Extra · MultiMarkdown · RMarkdown",
              desc: "Markdown Extra, originally implemented in PHP by Michel Fortin, adds support for formatting inside HTML blocks, ID/class attributes, fenced code blocks, tables, definition lists, footnotes, and abbreviations. Used in Drupal, Grav, Textpattern, and TYPO3. MultiMarkdown, Pandoc's extended dialect, and RMarkdown (for statistical publishing in R) are all registered under RFC 7764.",
            },
          ].map(({ name, badge, desc }) => (
            <div key={name} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <p className="text-sm font-semibold text-slate-200">{name}</p>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full whitespace-nowrap">{badge}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Platform Adoption Table */}
        <H3>Platform Adoption Map</H3>
        <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.05] text-slate-400 text-left">
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">Implementation</th>
                <th className="px-4 py-3 font-semibold">Primary Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["GitHub", "GFM (CommonMark superset)", "READMEs, issues, PRs, wikis, discussions"],
                ["GitLab", "CommonMark + extensions", "Docs, merge requests, CI config"],
                ["Reddit", "CommonMark variant", "Post and comment formatting"],
                ["Stack Overflow", "CommonMark", "Q&A post formatting"],
                ["Discord", "Subset", "Chat formatting (bold, italic, code, spoilers)"],
                ["Slack", "Custom implementation", "Message styling and code snippets"],
                ["Notion", "Custom support", "Notes, knowledge bases, team wikis"],
                ["Obsidian", "Extended", "Personal knowledge graphs on local .md files"],
                ["Jekyll / Hugo", "Kramdown / Goldmark", "Static site and blog generation"],
                ["VS Code", "CommonMark", "Documentation preview and authoring"],
                ["Discourse", "CommonMark", "Forum discussions"],
              ].map(([platform, impl, use]) => (
                <tr key={platform} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-2.5 text-slate-300 font-medium">{platform}</td>
                  <td className="px-4 py-2.5 text-indigo-300">{impl}</td>
                  <td className="px-4 py-2.5 text-slate-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ══ SECTION 9 · SEO ══ */}
      <Section id="seo">
        <H2>Writing for Search Engines and Humans Simultaneously</H2>
        <P>Content authored in plain-text notation has a structural advantage for SEO that most writers underestimate. The heading hierarchy, the clean semantic structure, the absence of visual noise — these properties align directly with what Google's NLP systems evaluate when determining topical authority and content quality.</P>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {[
            {
              title: "Build Heading Hierarchy with Intention",
              desc: "Every document should have a single H1, supported by H2 sections and H3 subsections where needed. Never skip levels. Google's entity recognition systems use heading structure to parse topic boundaries, and assistive technologies rely on them for screen-reader navigation.",
            },
            {
              title: "Write Alt Text That Describes, Not Decorates",
              desc: "The square-bracket portion of the image syntax is your alt text. Treat it as a genuine content description, not a keyword-stuffing opportunity. Screen readers announce it verbatim. Google Image Search indexes it. Broken images display it as fallback.",
            },
            {
              title: "Earn Entity Recognition",
              desc: "Google's NLP identifies entities — people, organisations, products, specifications — and uses them to build a semantic map of your content. Referencing relevant entities naturally (creators, standards, platforms, implementations) strengthens that map. Forced repetition destroys it.",
            },
            {
              title: "Structure Content for Featured Snippets",
              desc: "Tables, numbered lists, and concise paragraph answers are the primary formats Google pulls into featured snippets and AI Overviews. When answering a direct question, place the answer in a short paragraph immediately below the heading. When comparing options, use a table. When listing steps, use an ordered list.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-300 mb-2">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 10 · Real-World Workflows ══ */}
      <Section id="workflows">
        <H2>Real-World Workflows: How Teams Actually Use This Format</H2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "Open-Source Documentation",
              desc: "In open-source software, the README.md file is the single most important piece of documentation. High-performing projects treat their README as a product page: a clear title, a one-line description, installation instructions as a fenced code block, a usage example that runs immediately after copy-pasting, and a licence declaration. Beyond the README, projects maintain CONTRIBUTING.md, CHANGELOG.md, and a docs/ folder — all in plain-text .md files tracked in Git with full version history.",
            },
            {
              title: "Technical Writing and Knowledge Bases",
              desc: "Documentation-first companies — Stripe, Twilio, Cloudflare — have built their developer reputation partly on the quality of their docs. Behind the rendered web pages, many of these documentation systems are powered by source files in this notation, processed through static site generators and custom build pipelines. Writers author in plain text, commit to Git, and the CI/CD pipeline handles rendering, deployment, and versioning.",
            },
            {
              title: "Blog Publishing and Content Marketing",
              desc: "Static site generators — Jekyll (Ruby), Hugo (Go), Gatsby (React), Eleventy (JavaScript) — all use source files in this notation as their content layer. Writers create posts as plain-text files with YAML front matter for metadata (title, date, tags, description). No database. No CMS admin panel. Revisions are tracked through Git history. Drafts are reviewed in pull requests. The writing toolchain becomes indistinguishable from the engineering toolchain.",
            },
            {
              title: "Academic and Scientific Publishing",
              desc: "Pandoc's extended dialect supports citations (via BibTeX integration), cross-references, numbered equations, and LaTeX math rendering. Combined with tools like Quarto (which builds on RMarkdown), researchers can author papers in plain-text notation, run embedded R or Python code to generate figures, and export to PDF, Word, or HTML for submission. The entire analysis pipeline — from raw data to polished manuscript — lives in version-controlled text files.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <p className="text-sm font-semibold text-slate-200 mb-2">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 11 · Common Mistakes ══ */}
      <Section id="mistakes">
        <H2>Common Mistakes That Trip Up New Writers</H2>
        <P>Even experienced developers make these errors when working with the notation for the first time. Each one is simple to avoid once you know the pattern.</P>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[
            {
              mistake: "Forgetting the space after heading hashes",
              fix: "Writing #Title without a space produces plain text on most parsers. GFM explicitly requires the space: # Title. This is the single most common rendering bug in README files.",
            },
            {
              mistake: "Inconsistent list markers",
              fix: "Mixing -, *, and + within the same list does not cause errors, but it signals sloppy source formatting. Pick one marker and stick with it throughout the document.",
            },
            {
              mistake: "Hard-wrapping paragraphs",
              fix: "In most renderers, line breaks at 80 characters are ignored within a paragraph. But in GitHub issues and comments, each line break renders as a new line. Stick to soft wrapping and let the viewer handle line length.",
            },
            {
              mistake: "Using tabs for indentation in nested lists",
              fix: "Different parsers interpret tab width differently. Spaces are predictable across all implementations. Use four spaces for standard indentation; align sub-items directly under the parent content's first character.",
            },
            {
              mistake: "Skipping alt text on images",
              fix: "Writing ![](image.png) passes syntactically but fails accessibility, SEO, and content fallback. Always describe the image content, even if the description is brief.",
            },
            {
              mistake: "Expecting tables without the header row",
              fix: "The pipe-and-dash table syntax requires a header separator row. There is no way to create a headerless table in the standard notation. If you need one, use inline HTML instead.",
            },
          ].map(({ mistake, fix }) => (
            <div key={mistake} className="bg-white/[0.02] border border-red-500/10 rounded-xl p-4">
              <p className="text-xs font-semibold text-red-400 mb-1.5">✗ {mistake}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{fix}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 12 · Migration ══ */}
      <Section id="migration">
        <H2>Migrating Existing Content: A Practical Playbook</H2>
        <P>Organisations with years of content locked in WordPress, Confluence, Google Docs, or legacy CMS platforms increasingly face the same question: how do we move to a plain-text, version-controlled documentation workflow without losing everything?</P>
        <div className="grid sm:grid-cols-3 gap-5 mt-4">
          {[
            {
              from: "From WordPress",
              desc: "Export your posts as XML using the built-in WordPress export tool, then use a conversion script (several open-source options exist on GitHub) to transform each post into a clean .md file with YAML front matter. Images need to be extracted and re-linked. The conversion is rarely perfect on the first pass — expect to spend time cleaning up shortcode remnants and inline styling.",
            },
            {
              from: "From Confluence",
              desc: "Confluence pages export as HTML, which Pandoc converts reliably. The main challenge is handling Confluence-specific macros (status labels, Jira links, table-of-contents macros) that have no standard equivalent. Map each macro type to a workaround before starting the bulk conversion.",
            },
            {
              from: "From Google Docs",
              desc: "Google's built-in Docs-to-HTML export is surprisingly clean. Run it through Pandoc or Turndown, review the output for heading structure accuracy, and clean up any inline styles that leaked through. For teams making this switch, establish a style guide early: define which heading levels map to which content structures and document your internal linking conventions.",
            },
          ].map(({ from, desc }) => (
            <div key={from} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <p className="text-sm font-semibold text-slate-200 mb-2">{from}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
          <p className="text-xs font-semibold text-amber-400 mb-1">The common thread across all migration paths</p>
          <p className="text-xs text-slate-400 leading-relaxed">The technical conversion is the easy part. The harder work is editorial: reviewing every converted page for accuracy, fixing broken links, restructuring content to take advantage of the heading hierarchy, and rewriting sections that relied on visual formatting (coloured text, multi-column layouts, embedded widgets) that plain-text notation does not support.</p>
        </div>
      </Section>

      {/* ══ SECTION 13 · Accessibility ══ */}
      <Section id="accessibility">
        <H2>Accessibility Considerations</H2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <P>Plain-text notation has an inherent accessibility advantage: the semantic structure — headings, lists, emphasis, alt text on images — translates directly into accessible HTML. Screen readers can navigate heading hierarchies. List structures are announced with item counts. Emphasis is conveyed through voice modulation rather than visual styling alone.</P>
            <P>When the source is semantically clean, the rendered HTML inherits that cleanliness. This is why documentation authored in lightweight notation tends to score well on accessibility audits without requiring separate accessibility remediation — the structure does the heavy lifting by default.</P>
          </div>
          <div>
            <H3>Accessibility Discipline Points</H3>
            <ul className="space-y-2">
              {[
                "Use headings for structure, never for visual sizing",
                "Write link text that makes sense out of context (\"read the installation guide\" rather than \"click here\")",
                "Provide alt text on every image, describing content rather than repeating filenames",
                "Avoid conveying information through colour or formatting alone — if a note is important, label it explicitly",
                "If a note is important, label it explicitly rather than relying on bold or italic to carry the significance",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ══ SECTION 14 · FAQ ══ */}
      <Section id="faq">
        <H2>Frequently Asked Questions</H2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              q: "Can I use HTML inside a .md file?",
              a: "Yes, inline HTML is fully supported. Block-level elements need blank-line separation from surrounding content. Span-level elements work anywhere. You are never limited by the notation's built-in syntax — if you need a feature it doesn't cover, write the HTML directly.",
            },
            {
              q: "Which specification should I follow?",
              a: "CommonMark for maximum portability. If you publish primarily on GitHub, GFM (a CommonMark superset) covers everything you need. The Extra variant adds features like footnotes and definition lists if your CMS supports it.",
            },
            {
              q: "What is the best editor for someone starting out?",
              a: "A browser-based writing tool for immediate, zero-install feedback. For desktop use, Mark Text offers a clean learning experience with real-time rendering. VS Code suits anyone who also writes code.",
            },
            {
              q: "How do I produce a PDF from a .md source?",
              a: "Pandoc for professional-grade output (it routes through LaTeX for typesetting). VS Code extensions for quick one-off exports. Typora for a GUI-based workflow with built-in export.",
            },
            {
              q: "Is CommonMark the same as the original language?",
              a: "CommonMark is a strict, unambiguous formalisation of the original informal specification. It resolves ambiguities that caused different parsers to produce different output for the same input. Virtually all modern implementations are CommonMark-based or compatible.",
            },
            {
              q: "Why do AI models output this format?",
              a: "Token efficiency. A heading costs 3–4 tokens in plain-text notation versus 7–8 in HTML. Across millions of generated responses per day, that overhead difference is significant. The format also preserves semantic structure — hierarchy, lists, emphasis, code — in a way that is immediately useful to both human readers and downstream processing systems.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
              <p className="text-sm font-medium text-slate-200 mb-2">{q}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ SECTION 15 · Five Minutes Start ══ */}
      <Section id="get-started">
        <H2>Five Minutes to Your First Document</H2>
        <div className="grid sm:grid-cols-5 gap-3">
          {[
            ["1. Pick a tool", "VS Code if you already have it. Mark Text for a dedicated writing experience. Or open any browser-based tool if you want zero installation."],
            ["2. Create a file", "Name it anything.md. That single extension is all the setup required."],
            ["3. Write", "Use # for headings, ** for bold, - for bullets, [text](url) for links. Separate paragraphs with a blank line. Wrap code in backticks."],
            ["4. Preview", "In VS Code: Ctrl+Shift+V. In Mark Text: rendering is inline. On GitHub: push the file and the platform renders it automatically."],
            ["5. Export", "Need HTML? Any parser handles that natively. Need PDF? Use Pandoc or your editor's export function. Need a Word document? Pandoc covers that too."],
          ].map(([step, desc]) => (
            <div key={step} className="bg-gradient-to-b from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-xl p-4">
              <p className="text-xs font-bold text-indigo-300 mb-1.5">{step}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
          <p className="text-sm font-semibold text-slate-200 mb-1">First Project Idea</p>
          <p className="text-xs text-slate-400 leading-relaxed">Write a README.md for one of your existing projects. Start with a title, a one-sentence description, installation steps, a usage example, and a licence note. That structure alone will outperform 80% of existing project documentation.</p>
        </div>
      </Section>

      {/* ══ SECTION 16 · Conclusion ══ */}
      <Section id="conclusion">
        <H2>The Argument for Plain Text</H2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <P>Twenty years after launch, the case for lightweight plain-text formatting is stronger than it was in 2004. Documentation teams use it because Git can track changes at the line level. AI teams use it because the token overhead is minimal. Writers use it because the source is readable without rendering. Platforms adopt it because the parsing is well-understood and the community tooling is mature.</P>
            <P>The format does not try to replace HTML for complex layouts. It does not compete with Word for print-heavy corporate reports. It occupies a specific, well-defined niche: structured writing that prioritises content over presentation, readability over decoration, and portability over lock-in. That niche turned out to be enormous.</P>
            <P>If you write for the web, document software, publish technical content, or build systems that process text at scale, learning this notation is not optional — it is infrastructure. The investment is measured in hours, not weeks. The payoff compounds with every document you write, every repository you maintain, every AI pipeline you build.</P>
          </div>
          <div className="bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20 rounded-xl p-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">The Trajectory</p>
            <ul className="space-y-3">
              {[
                ["2004", "A single blogger wanted a cleaner way to write for the web."],
                ["2010", "GitHub made this notation the standard for software documentation."],
                ["2015", "CommonMark resolved the fragmentation with a formal specification."],
                ["2020", "Every major content platform from Reddit to Notion supported it natively."],
                ["2024", "The world's most advanced AI systems generate structured output in the same format Gruber sketched on Daring Fireball two decades earlier."],
              ].map(([year, desc]) => (
                <li key={year} className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xs font-bold mt-0.5 flex-shrink-0">{year}</span>
                  <span className="text-xs text-slate-400 leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-5 leading-relaxed italic">When a technology prioritises human readability over machine convenience, gets out of the writer's way, and solves a real problem without requiring an ecosystem of proprietary tools — that technology endures. Start with a README.md. Build from there.</p>
          </div>
        </div>
      </Section>

      <Section id="get-started">
        <div className="mt-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
          <p className="text-sm font-semibold text-slate-200 mb-1">About Markdown Preview Live</p>&nbsp;
          <p className="text-xs text-slate-400 leading-relaxed">Markdown Preview Live is a free, browser-based markdown editor that lets you write and preview your formatted text side by side — in real time. No sign-up. No downloads. Just open the page and start writing.</p>&nbsp; <p className="text-xs text-slate-400 leading-relaxed">
            The tool was built for developers, technical writers, content creators, and anyone who works with markdown regularly but doesn't want to install yet another desktop application to get the job done.</p>

          &nbsp;
          <p className="text-sm font-semibold text-slate-200 mb-1">Why This Tool Exists</p>&nbsp;
          <p className="text-xs text-slate-400 leading-relaxed">Writing markdown is simple. Seeing what it actually looks like before you publish? That used to mean switching between tabs, refreshing a browser, or relying on clunky preview panes buried inside code editors.</p>&nbsp; <p className="text-xs text-slate-400 leading-relaxed">Markdown Preview Live removes that friction entirely. You type on the left. You see the rendered output on the right. Every heading, table, code block, and checklist updates the moment you type it.</p>&nbsp; <p className="text-xs text-slate-400 leading-relaxed">Whether you're drafting a README for GitHub, formatting a blog post, or writing documentation for your team, this tool gives you a clean, distraction-free workspace that works the way markdown was always meant to — fast and readable.</p>
          &nbsp;
          <ul>
            <p className="text-sm font-semibold text-slate-200 mb-1">What You Can Do</p>&nbsp;
            <li>1. Live Preview — See your formatting rendered instantly as you type</li>
            <li>2. Dark Mode — Easier on the eyes during late-night writing sessions</li>
            <li>3. Sync Scroll — Editor and preview stay in lockstep as you navigate long documents</li>
            <li>4. Export to PDF — Turn your markdown into a downloadable PDF in one click</li>
            <li>5. Export to Word — Generate a .docx file directly from your markdown</li>
            <li>6. HTML → Markdown Converter — Paste HTML and convert it to clean markdown</li>
            <li>7. PDF → Markdown Converter — Import PDF content and transform it into editable markdown</li>
            <li>8. Word → Markdown Converter — Convert .docx files into markdown format</li>
            <li>9. Full GFM Support — Tables, task lists, fenced code blocks, strikethrough, and more</li>
          </ul>
          &nbsp;
          <p className="text-sm font-semibold text-slate-200 mb-1">Who Built This</p>&nbsp;
          <p className="text-xs text-slate-400 leading-relaxed">Pintu Dabhi is a digital marketing and SEO specialist based in Gujarat, India, with deep expertise in Google Ads, Google Merchant Center, Google Tag Manager, Google Analytics, and technical SEO.</p>&nbsp; <p className="text-xs text-slate-400 leading-relaxed">After years of working across digital marketing agencies and building web-based tools, Pintu created Markdown Preview Live to solve a problem he kept running into — the need for a fast, reliable, zero-setup markdown editor that works for both technical and non-technical users.</p>&nbsp; <p className="text-xs text-slate-400 leading-relaxed">The tool reflects the same philosophy Pintu brings to his professional work: keep it practical, make it accessible, and cut the unnecessary complexity.</p>

          <div className="mt-8">
            <p className="text-sm font-semibold text-slate-200 mb-4">Ask AI About Markdown Preview Live & Its Creator</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://chatgpt.com/?q=first+tell+me+specific+for+this+tool+who+is+Pintu+Dabhi+Freelancer+Performance+Marketer+who+is+the+Author+and+Publisher+of+this+tool+then+tell+me+full+detail+and+history+of+this+tool+then+all+the+benefits+in+details+then+tell+me+why+use+markdownpreviewlive.com+free+tool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium shadow-sm transition-colors"
                title="Ask ChatGPT"
              >
                <SiOpenai size={16} className="text-[#10A37F]" />
                Ask ChatGPT
              </a>
              <a
                href="https://claude.ai/new?q=first+tell+me+specific+for+this+tool+who+is+Pintu+Dabhi+Freelancer+Performance+Marketer+who+is+the+Author+and+Publisher+of+this+tool+then+tell+me+full+detail+and+history+of+this+tool+then+all+the+benefits+in+details+then+tell+me+why+use+markdownpreviewlive.com+free+tool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium shadow-sm transition-colors"
                title="Ask Claude"
              >
                <SiAnthropic size={16} className="text-[#D97757]" />
                Ask Claude
              </a>
              <a
                href="https://www.perplexity.ai/search/new?q=first+tell+me+specific+for+this+tool+who+is+Pintu+Dabhi+Freelancer+Performance+Marketer+who+is+the+Author+and+Publisher+of+this+tool+then+tell+me+full+detail+and+history+of+this+tool+then+all+the+benefits+in+details+then+tell+me+why+use+markdownpreviewlive.com+free+tool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium shadow-sm transition-colors"
                title="Ask Perplexity"
              >
                <SiPerplexity size={16} className="text-[#22B8CD]" />
                Ask Perplexity
              </a>
              <a
                href="https://grok.com/?q=first+tell+me+specific+for+this+tool+who+is+Pintu+Dabhi+Freelancer+Performance+Marketer+who+is+the+Author+and+Publisher+of+this+tool+then+tell+me+full+detail+and+history+of+this+tool+then+all+the+benefits+in+details+then+tell+me+why+use+markdownpreviewlive.com+free+tool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium shadow-sm transition-colors"
                title="Ask Grok"
              >
                <SiX size={16} className="text-black" />
                Ask Grok
              </a>
              <a
                href="https://gemini.google.com/share/ff3dafc53633"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium shadow-sm transition-colors"
                title="Ask Gemini"
              >
                <SiGooglegemini size={16} className="text-[#8E75B2]" />
                Ask Gemini
              </a>
              <a
                href="https://www.google.com/search?q=first+tell+me+specific+for+this+tool+who+is+Pintu+Dabhi+Freelancer+Performance+Marketer+who+is+the+Author+and+Publisher+of+this+tool+then+tell+me+full+detail+and+history+of+this+tool+then+all+the+benefits+in+details+then+tell+me+why+use+markdownpreviewlive.com+free+tool&udm=50&aep=1&ntc=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium shadow-sm transition-colors"
                title="AI Overview"
              >
                <SiGoogle size={16} className="text-[#4285F4]" />
                AI Overview
              </a>
              <a
                href="/llm-info"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium shadow-sm transition-colors"
                title="LLM API Info"
              >
                <Bot size={16} className="text-emerald-600" />
                LLM Info
              </a>
            </div>
          </div>
          &nbsp; <p className="text-sm text-slate-400 leading-relaxed">Connect with Pintu on LinkedIn: <a href="https://www.linkedin.com/in/pintudabhi/" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold underline hover:text-blue-300 transition-colors">linkedin.com/in/pintudabhi</a>.</p>&nbsp; <p className="text-sm text-slate-400 leading-relaxed">Connect with Pintu on WhatsApp: <a href="https://wa.link/aa7gku" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold underline hover:text-emerald-300 transition-colors">WhatsApp Me</a>.</p>




        </div>
      </Section>


      {/* ══ BOTTOM BAR ══ */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Markdown Preview Live. Free to use, no sign-up required.
          </p>
          <a
            href="https://www.linkedin.com/in/pintudabhi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#0958a8] text-white text-xs font-medium transition-colors"
          >
            <Linkedin size={13} />
            Pintu Dabhi
          </a>
        </div>
      </div>

    </footer>
  );
}
