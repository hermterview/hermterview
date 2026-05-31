import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const serveBaseDir = ctx.argv.baseDir
    ? ctx.argv.baseDir.startsWith("/")
      ? ctx.argv.baseDir
      : `/${ctx.argv.baseDir}`
    : "/"
  const baseDir = ctx.argv.serve ? serveBaseDir : url.pathname
  const siteRoot = baseDir === "/" ? "" : baseDir.replace(/\/$/, "")
  const homeHref = siteRoot || "/"

  return (
    <article class="not-found-page popover-hint">
      <p class="not-found-kicker">Hermterview</p>
      <h1>404</h1>
      <p class="not-found-title">{i18n(cfg.locale).pages.error.notFound}</p>
      <p class="not-found-copy">주소가 바뀌었거나 아직 공개되지 않은 노트일 수 있습니다.</p>
      <a class="not-found-home" href={homeHref}>
        {i18n(cfg.locale).pages.error.home}
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (typeof fetchData !== "undefined") {
            fetchData.then(function(index) {
              var basePath = document.body.dataset.basepath || "";
              if (basePath.length > 1 && basePath.endsWith("/")) {
                basePath = basePath.slice(0, -1);
              }
              var pathname = window.location.pathname;
              var hasBasePrefix = basePath.length > 1 && pathname.startsWith(basePath);
              if (hasBasePrefix) {
                pathname = pathname.slice(basePath.length);
              }
              if (pathname.startsWith("/")) {
                pathname = pathname.slice(1);
              }
              if (pathname.endsWith("/")) {
                pathname = pathname.slice(0, -1);
              }
              if (pathname.endsWith(".html")) {
                pathname = pathname.slice(0, -5);
              }
              if (pathname.endsWith("/index")) {
                pathname = pathname.slice(0, -6);
              }
              var lowered = pathname.toLowerCase();
              if (lowered !== pathname && index[lowered] != null) {
                var prefix = hasBasePrefix ? basePath : "";
                var target = prefix + (prefix.endsWith("/") ? "" : "/") + lowered;
                window.location.replace(target);
              }
            });
          }
          `,
        }}
      />
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
