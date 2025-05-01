import { useState, useEffect, useRef } from 'react';

export interface UseEndpointOptions {
    /**
     * The URL to fetch data from.
     */
    url: string;
    /**
     * Optional parameters (method, headers, body, etc.).
     */
    init?: RequestInit;
}

export interface UseEndpointResult<T> {
    /**
     * Parsed JSON data returned by the endpoint or null.
     */
    data: T | null;
    /**
     * The progress indicator.
     */
    loading: boolean;
    /**
     * Any error encountered during the fetch or null.
     */
    error: Error | null;
    /**
     * Function to manually abort the request, if needed.
     */
    abort: () => void;
}

/**
 * A React hook for fetching data from an HTTP endpoint with
 *      built-in loading, error, and abort handling.
 *
 * @param {UseEndpointOptions} options - Configuration options for the fetch.
 * @param {AbortSignal} [signal] - Optional abort signal to cancel the request.
 * @returns {UseEndpointResult<T>} An object containing loading, data, error, and abort.
 *
 * @example
 * @todo: add example
 */
export function useEndpoint<T = unknown>(
    { url, init }: UseEndpointOptions,
    signal?: AbortSignal
): UseEndpointResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const abortControllerRef = useRef<AbortController>(new AbortController());

    useEffect(() => {
        const controller = new AbortController();
        abortControllerRef.current = controller;
        setLoading(true);
        setError(null);

        fetch(url, {
            signal: signal ?? controller.signal,
            ...init,
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return (await response.json()) as T;
            })
            .then((json) => {
                setData(json);
            })
            .catch((error: unknown) => {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    /* do nothing */
                } else if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error(String(error)));
                }
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, [url, init, signal]);

    /**
     * Manually abort the request
     */
    const abort = () => {
        abortControllerRef.current.abort();
    };

    return { data, loading, error, abort };
}
