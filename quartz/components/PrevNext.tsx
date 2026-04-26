import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const PrevNext: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const slug = fileData.slug!

  const parts = slug.split("/")
  if (parts.length < 2) return null
  const parentSlug = parts.slice(0, -1).join("/")

  const siblings = allFiles
    .filter((f) => {
      const s = f.slug!
      const sParts = s.split("/")
      return (
        sParts.length === parts.length &&
        sParts.slice(0, -1).join("/") === parentSlug &&
        sParts[sParts.length - 1] !== "index"
      )
    })
    .sort((a, b) => (a.slug! < b.slug! ? -1 : 1))

  const currentIndex = siblings.findIndex((f) => f.slug === slug)
  if (currentIndex === -1) return null

  const prev = currentIndex > 0 ? siblings[currentIndex - 1] : null
  const next = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null

  return (
    <nav class={classNames(displayClass, "prevnext")}>
      <div class="prevnext-prev">
        {prev && (
          <a href={"/" + prev.slug}>
            <span class="prevnext-arrow">←</span>
            <span class="prevnext-label">Previous</span>
          </a>
        )}
      </div>
      <div class="prevnext-index">
        <a href={"/" + parentSlug}>Index</a>
      </div>
      <div class="prevnext-next">
        {next && (
          <a href={"/" + next.slug}>
            <span class="prevnext-label">Next</span>
            <span class="prevnext-arrow">→</span>
          </a>
        )}
      </div>
    </nav>
  )
}

PrevNext.css = `
.prevnext {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lightgray);
  font-size: 16px;
}
.prevnext-prev, .prevnext-next {
  flex: 1;
}
.prevnext-next {
  display: flex;
  justify-content: flex-end;
}
.prevnext-index {
  flex: 0;
  white-space: nowrap;
  text-align: center;
}
.prevnext a {
  color: var(--darkgray);
  text-decoration: none;
  transition: color 0.2s;
}
.prevnext a:hover { color: var(--secondary); }
.prevnext-prev a:hover .prevnext-label,
.prevnext-prev a:hover .prevnext-arrow,
.prevnext-next a:hover .prevnext-label,
.prevnext-next a:hover .prevnext-arrow {
  color: var(--secondary);
}
.prevnext-prev a {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}
.prevnext-next a {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}
.prevnext-index a {
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--darkgray);
}
.prevnext-label {
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--darkgray);
}
.prevnext-arrow {
  color: var(--secondary);
  font-size: 20px;
}
`

export default (() => PrevNext) satisfies QuartzComponentConstructor