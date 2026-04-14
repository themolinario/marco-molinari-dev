export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-16 px-4 pb-10 pt-8 text-[#444444]">
      <div className="page-wrap flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="m-0 text-xs">
          &copy; {year} Marco Molinari
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/themolinario"
            target="_blank"
            rel="noreferrer"
            className="text-xs hover:text-[#8a8a8a] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/marco-molinari-1a048a166/"
            target="_blank"
            rel="noreferrer"
            className="text-xs hover:text-[#8a8a8a] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:themolinario@gmail.com"
            className="text-xs hover:text-[#8a8a8a] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
