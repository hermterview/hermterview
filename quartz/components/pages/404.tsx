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
  const hrefFor = (slug: string) => `${siteRoot}/${slug}`

  return (
    <article class="not-found-page popover-hint">
      <p class="not-found-kicker">Hermterview / 404</p>
      <h1>{i18n(cfg.locale).pages.error.notFound}</h1>
      <p class="not-found-title">요청한 주소에 공개 노트가 없습니다.</p>
      <p class="not-found-copy">
        링크가 바뀌었거나 아직 발행 전인 노트일 수 있어요. 홈에서 공개된 인터뷰 노트와 복습 항목을
        다시 찾아볼 수 있습니다.
      </p>
      <nav class="not-found-actions" aria-label="404 page links">
        <a class="not-found-home" href={homeHref}>
          {i18n(cfg.locale).pages.error.home}
        </a>
        <a class="not-found-link" href={hrefFor("review/weak-points")}>
          Weak Points
        </a>
        <a class="not-found-link" href={hrefFor("review/homework")}>
          Homework
        </a>
      </nav>
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
