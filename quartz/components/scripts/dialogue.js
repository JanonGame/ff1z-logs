function getExpression(name, face) {
  return `/assets/portraits/${name.toLowerCase()}/${face || "neutral"}.png`;
}

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll("p");

  blocks.forEach(p => {
    const match = p.innerHTML.match(/^\*\*(.+?)(\[(.+)\])?:\*\*\s*<br>([\s\S]*)/);

    if (!match) return;

    const name = match[1].trim();
    const face = match[3];
    const text = match[4];

    const side = Math.random() > 0.5 ? "left" : "right";

    const el = document.createElement("div");
    el.className = `dialogue ${side}`;

    el.innerHTML = `
      <img src="${getExpression(name, face)}" />
      <div class="content">
        <div class="name">${name}</div>
        <div class="text">${text}</div>
      </div>
    `;

    p.replaceWith(el);
  });

  // OOC handling
  document.querySelectorAll("p").forEach(p => {
    if (p.textContent.startsWith("(OOC)")) {
      p.className = "ooc";
    }
  });

  // Scene blocks
  document.querySelectorAll("em").forEach(em => {
    if (em.textContent.includes("scene:")) {
      const div = document.createElement("div");
      div.className = "scene";
      div.textContent = em.textContent.replace("scene:", "").trim();
      em.replaceWith(div);
    }
  });
});
