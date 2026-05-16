const http = require("http");

const PORT = 8000;
const HASH = "0000000000000000000000000000000000000000";

function pkt(s) {
  return (s.length + 4).toString(16).padStart(4, "0") + s;
}

function flush() {
  return "0000";
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;

  if (p.endsWith("/info/refs")) {
    const service = url.searchParams.get("service") || "git-upload-pack";

    res.writeHead(200, {
      "Content-Type": `application/x-${service}-advertisement`,
      "Cache-Control": "no-cache",
    });

    return res.end(
      pkt(`# service=${service}\n`) +
      flush() +
      pkt(`${HASH} refs/heads/main\n`) +
      flush()
    );
  }

  if (p.endsWith("/HEAD")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("ref: refs/heads/main\n");
  }

  if (p.endsWith("/git-upload-pack")) {
    res.writeHead(200, {
      "Content-Type": "application/x-git-upload-pack-result",
    });

    return res.end(
      pkt("NAK") +
      flush()
    );
  }

  if (p.includes("/objects") || p.includes("/refs")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("");
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("ok");
}).listen(PORT, () => {
  console.log("fake git server running on http://localhost:" + PORT);
})
