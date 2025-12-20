import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
  
globalThis.setFetchResponse = (val) => {
    globalThis.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(val),
        ok: true,
        status: 200
    }));
};

afterEach(() => {
    cleanup();
});