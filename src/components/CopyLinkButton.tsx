"use client";

import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export function CopyLinkButton({ path }: { path: string }) {
  // Origin chỉ có ở trình duyệt; khi render trên server dùng chuỗi rỗng.
  const origin = useSyncExternalStore(
    noopSubscribe,
    () => window.location.origin,
    () => "",
  );
  const url = origin + path;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        readOnly
        value={url}
        onFocus={(e) => e.currentTarget.select()}
        aria-label="Link thông báo"
        className="min-w-0 flex-1 rounded-md border border-line bg-background px-3 py-2 text-sm"
      />
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium hover:bg-line"
      >
        {copied ? "Đã sao chép ✓" : "Sao chép link"}
      </button>
    </div>
  );
}
