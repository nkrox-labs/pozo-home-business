---
name: React Query 4xx retry config
description: React Query retries 401/4xx by default, causing long blank loading screens on auth-gated pages
---

React Query retries failed requests 3 times by default with exponential backoff (~14s total). On auth-gated pages that call `GET /api/admin/me`, unauthenticated users see a black screen for ~14s.

**Why:** The default `retry: 3` treats 401 the same as a transient network error.

**How to apply:** Always configure QueryClient with a custom retry function that returns `false` for 4xx status codes:
```ts
retry: (failureCount, error) => {
  const status = (error as { status?: number })?.status;
  if (status && status >= 400 && status < 500) return false;
  return failureCount < 2;
}
```
Also ensure loading states render a visible spinner (not `null`) to avoid blank screens.
