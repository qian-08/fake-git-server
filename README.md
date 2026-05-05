# Fake Git Server (Deno)

A minimal **fake Git HTTP server** implemented with Deno.
This project mimics parts of the Git Smart HTTP protocol, but does **not** implement actual Git functionality.

It is designed for learning, experimentation, and understanding how Git clients interact with servers over HTTP.

---

## ✨ Features

* Basic HTTP endpoints that resemble Git Smart HTTP
* Simulated responses for:

  * `info/refs`
  * `HEAD`
  * `refs`
  * `objects`
  * `git-upload-pack`
* Lightweight and runs entirely on Deno
* No external dependencies

---

## ⚠️ Disclaimer

This is **not a real Git server**.

* No actual repository data is stored
* No real Git objects are served
* `git clone` and `git fetch` will **not work properly**
* Responses are hardcoded or fake

This project is purely for:

* Learning Git protocol basics
* Testing HTTP interactions
* Having fun building low-level systems

---

## 🚀 Getting Started

### 1. Install Deno

```sh
curl -fsSL https://deno.land/install.sh | sh
```

### 2. Run the server

```sh
deno run --allow-net index.ts
```

The server will start on the default port (usually `http://localhost:8000`).

---

## 📡 Available Endpoints

### `GET /user/repo.git/info/refs?service=git-upload-pack`

Returns a fake service advertisement.

---

### `GET /user/repo.git/HEAD`

Returns:

```
ref: refs/heads/main
```

---

### `GET /user/repo.git/refs/*`

Returns a fake commit hash:

```
deadbeefdeadbeefdeadbeef
```

---

### `GET /user/repo.git/objects/*`

Returns placeholder object data:

```
fake-object
```

---

### `POST /user/repo.git/git-upload-pack`

Returns a fake upload-pack response:

```
0008NAK
0032fake-pack-response
0000
```

---

## 🧠 How It Works

The server uses `Deno.serve()` to handle HTTP requests and manually routes paths.

It mimics Git behavior by:

* Parsing URL paths
* Returning protocol-like responses
* Setting Git-specific content types

However, it does **not**:

* Parse real Git data
* Generate packfiles
* Maintain repository state

---

## 🛠️ Future Ideas

If you want to turn this into a real Git server:

* Read actual `.git` directories
* Implement pkt-line encoding properly
* Serve real refs and objects
* Implement `git-upload-pack` negotiation
* Generate packfiles dynamically

---

## 📄 License

MIT

---

## 🙃 Why?

Because sometimes you want to understand a complex protocol
by building a terrible version of it first.
