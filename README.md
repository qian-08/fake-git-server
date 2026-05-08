

# Fake Git Server

A mock Git HTTP server that emulates basic Git endpoints for testing, debugging, and education.

This project does **not implement real Git functionality**.
It only simulates Git protocol responses over HTTP.

---

## ⚠️ Disclaimer

This server is **not a real Git repository host**.

* `git clone` will NOT work in a real-world sense
* Responses are faked and non-functional
* Packfiles and object storage are not implemented

If you try to use it like real Git, it will confidently lie to you.

---

## Features

* Fake Git Smart HTTP endpoints
* Minimal Git-like response structure
* Useful for:

  * Protocol testing
  * Proxy debugging
  * Learning Git internals (in a “what not to do” way)

---

## Endpoints

### `GET /user/repo.git/info/refs`

Returns fake service advertisement.

### `GET /user/repo.git/HEAD`

Returns:

```
ref: refs/heads/main
```

### `GET /user/repo.git/refs/*`

Returns dummy commit hash.

### `GET /user/repo.git/objects/*`

Returns fake object payload.

### `POST /user/repo.git/git-upload-pack`

Returns mocked upload-pack response.

---

## 🚀 Usage

### Start server

```bash
node server.js
```

Server runs on:

```
http://localhost:8000
```

---

## 🧪 “Clone” Example (DOES NOT ACTUALLY WORK)

You can try to fool Git into thinking this is a real server:

```bash
git clone http://localhost:8000/user/repo.git
```

### Expected reality:

* Git will attempt communication
* Server will respond with mock data
* Clone will likely fail, hang, or produce nonsense
* Nothing meaningful will be checked out

### Expected illusion:

* Git thinks something is happening
* You briefly feel powerful
* Then reality resumes

---

## Why this exists

Because sometimes you don’t want a real Git server.

You want:

* predictable responses
* controlled failures
* protocol-shaped lies

---

## Limitations

* No real repository storage
* No commit history
* No branches
* No diff
* No authentication
* No actual Git compatibility

---

## License

MIT

---

## Final note

This project does not replace Git.

It just convincingly impersonates it for short periods of time, which is honestly a skill some humans also specialize in.
