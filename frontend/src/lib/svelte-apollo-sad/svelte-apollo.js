import { getContext, setContext, onMount } from 'svelte';
import { ApolloError } from '@apollo/client/core/index.js';
import { readable } from 'svelte/store';

const CLIENT = typeof Symbol !== "undefined" ? Symbol("client") : "@@client";
function getClient() {
    const client = getContext(CLIENT);
    if (!client) {
        throw new Error("ApolloClient has not been set yet, use setClient(new ApolloClient({ ... })) to define it");
    }
    return client;
}
function setClient(client) {
    setContext(CLIENT, client);
}

function mutation(mutation, initialOptions = {}) {
    const client = getClient();
    return (options) => client.mutate({ mutation, ...initialOptions, ...options });
}

function observableToReadable(observable, initialValue = {
    loading: true,
    data: undefined,
    error: undefined,
}) {
    const store = readable(initialValue, (set) => {
        const skipDuplicate = initialValue?.data !== undefined;
        let skipped = false;
        const subscription = observable.subscribe((result) => {
            if (skipDuplicate && !skipped) {
                skipped = true;
                return;
            }
            if (result.errors) {
                const error = new ApolloError({ graphQLErrors: result.errors });
                set({ loading: false, data: undefined, error });
            }
            else {
                set({ loading: false, data: result.data, error: undefined });
            }
        }, (error) => set({
            loading: false,
            data: undefined,
            error: error && "message" in error ? error : new Error(error),
        }));
        return () => subscription.unsubscribe();
    });
    return store;
}
const extensions = [
    "fetchMore",
    "getCurrentResult",
    "getLastError",
    "getLastResult",
    "isDifferentFromLastResult",
    "refetch",
    "resetLastResults",
    "resetQueryStoreErrors",
    "result",
    "setOptions",
    "setVariables",
    "startPolling",
    "stopPolling",
    "subscribeToMore",
    "updateQuery",
];
function observableQueryToReadable(query, initialValue) {
    const store = observableToReadable(query, initialValue);
    for (const extension of extensions) {
        store[extension] = query[extension].bind(query);
    }
    return store;
}

const restoring = typeof WeakSet !== "undefined" ? new WeakSet() : new Set();
function restore(query, options) {
    const client = getClient();
    restoring.add(client);
    afterHydrate(() => restoring.delete(client));
    client.writeQuery({ query, ...options });
}
function afterHydrate(callback) {
    // Attempt to wait for onMount (hydration of current component is complete),
    // but if that fails (e.g. outside of component initialization)
    // wait for next event loop for hydrate to complete
    try {
        onMount(callback);
    }
    catch (_error) {
        setTimeout(callback, 1);
    }
}

function query(query, options = {}) {
    const client = getClient();
    const queryOptions = { ...options, query };
    // If client is restoring (e.g. from SSR), attempt synchronous readQuery first
    let initialValue;
    if (restoring.has(client)) {
        try {
            // undefined = skip initial value (not in cache)
            initialValue = client.readQuery(queryOptions) || undefined;
        }
        catch (err) {
            // Ignore preload errors
        }
    }
    const observable = client.watchQuery(queryOptions);
    const store = observableQueryToReadable(observable, initialValue !== undefined
        ? {
            data: initialValue,
        }
        : undefined);
    return store;
}

function subscribe(query, options = {}) {
    const client = getClient();
    const observable = client.subscribe({ query, ...options });
    return observableToReadable(observable);
}

export { getClient, mutation, observableToReadable, query, restore, setClient, subscribe };
//# sourceMappingURL=svelte-apollo.js.map
