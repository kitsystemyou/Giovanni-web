```mermaid
sequenceDiagram
    actor u as User
    participant w as web(Next.js)
    participant s as Server
    participant g as Google
    u ->> w: Access
    alt not login:
    w ->> g: Request authorization
    g -->> w: Authorization display
    w ->> g: Authorize
    g -->> w: Redirect
    else logined
        w ->> s: Request: with access token
        s -->> w: Resopnse
    end
    w ->> u: use Application
```

## how to authorization
While using authorization as a substitute for authentication is not a recommended approach, it can be used as an alternative for social login in practice. You can store the access token with an expiration period in a cookie and utilize the access token obtained through Google authorization as a replacement for authentication and session management.