import { describe, it, expect } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "..//src/api/auth.js";

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header is malformed", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer abc123",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns the API key when header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123",
    };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  it("returns the second token only, ignoring extra tokens", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123 extra",
    };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  it("handles lowercase header key correctly", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey key-value",
    };
    expect(getAPIKey(headers)).toBe("key-value");
  });
});
