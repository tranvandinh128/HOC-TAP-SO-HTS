# DTC module boundary

This folder contains DTC-only catalog/types at the initial UI-foundation stage.

Rules:
- Do not import browser-only APIs into server modules.
- Do not trust user IDs, roles, scopes, Pi UID, or entitlements supplied by the browser.
- Every protected operation must verify the HTS session and DTC entitlement on the server.
- Never store private signing/encryption keys or wallet passphrases on the server.
- Keep signing keys separate from encryption keys.
- Use reviewed cryptographic libraries and standards; do not implement primitives manually.
