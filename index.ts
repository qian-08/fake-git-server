Deno.serve((req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  function send(body: string, status = 200, headers: Record<string, string> = {}) {
    return new Response(body, { status, headers });
  }

  if (path === "/user/repo.git/info/refs") {
    const service = url.searchParams.get("service") || "git-upload-pack";

    return send(
      "001e# service=git-upload-pack\n0000",
      200,
      {
        "Content-Type": `application/x-${service}-advertisement`,
        "Cache-Control": "no-cache",
      }
    );
  }

  if (path === "/user/repo.git/HEAD") {
    return send("ref: refs/heads/main\n", 200, {
      "Content-Type": "text/plain",
    });
  }

  if (path.startsWith("/user/repo.git/refs")) {
    return send("deadbeefdeadbeefdeadbeef\n", 200);
  }

  if (path.startsWith("/user/repo.git/objects")) {
    return send("fake-object", 200);
  }

  if (path === "/user/repo.git/git-upload-pack") {
    return send(
      "0008NAK\n0032fake-pack-response\n0000",
      200,
      { "Content-Type": "application/x-git-upload-pack-result" }
    );
  }

  return send("ok (fake git server)");
});
