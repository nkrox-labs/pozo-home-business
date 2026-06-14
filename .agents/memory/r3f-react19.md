---
name: React Three Fiber + React 19
description: R3F v8 is incompatible with React 19; workaround is pure Canvas API
---

R3F v8 crashes on React 19 with "Cannot read properties of undefined (reading 'ReactCurrentOwner')". R3F v9 exists but may still have issues.

**Why:** React 19 removed the internal `ReactCurrentOwner` reconciler reference that R3F v8 depended on.

**How to apply:** For any project using React 19 (this monorepo's default), replace `@react-three/fiber` particle/background effects with pure HTML5 Canvas + `useEffect`/`requestAnimationFrame`. This gives identical visuals with zero compatibility risk and smaller bundle size.
