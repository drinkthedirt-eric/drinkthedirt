import { ApolloClient, MutationOptions, FetchResult, Observable, ApolloError, ObservableQuery, WatchQueryOptions, OperationVariables, DataProxy, SubscriptionOptions } from '@apollo/client/core/index.js';
import { DocumentNode } from 'graphql';
import { Readable } from 'svelte/store';

declare function getClient<TCache = any>(): ApolloClient<TCache>;
declare function setClient<TCache = any>(client: ApolloClient<TCache>): void;

declare type MutateOptions<T = unknown, TVariables = unknown> = Omit<MutationOptions<T, TVariables>, "mutation">;
declare type Mutate<T = unknown, TVariables = unknown> = (options: MutateOptions<T, TVariables>) => Promise<FetchResult<T>>;
declare function mutation<T = unknown, TVariables = unknown>(mutation: DocumentNode, initialOptions?: MutateOptions<T, TVariables>): Mutate<T, TVariables>;

interface LoadingState {
    loading: true;
    data?: undefined;
    error?: undefined;
}
interface ErrorState {
    loading: false;
    data?: undefined;
    error: ApolloError | Error;
}
interface DataState<TData = unknown> {
    loading: false;
    data: TData | null | undefined;
    error?: undefined;
}
declare type Result<TData = unknown> = LoadingState | ErrorState | DataState<TData>;
declare type ReadableResult<TData = unknown> = Readable<Result<TData>>;
declare function observableToReadable<TData = unknown>(observable: Observable<FetchResult<TData>>, initialValue?: Result<TData>): ReadableResult<TData>;
interface ObservableQueryExtensions<TData = unknown> {
    fetchMore: ObservableQuery<TData>["fetchMore"];
    getCurrentResult: ObservableQuery<TData>["getCurrentResult"];
    getLastError: ObservableQuery<TData>["getLastError"];
    getLastResult: ObservableQuery<TData>["getLastResult"];
    isDifferentFromLastResult: ObservableQuery<TData>["isDifferentFromLastResult"];
    refetch: ObservableQuery<TData>["refetch"];
    resetLastResults: ObservableQuery<TData>["resetLastResults"];
    resetQueryStoreErrors: ObservableQuery<TData>["resetQueryStoreErrors"];
    result: ObservableQuery<TData>["result"];
    setOptions: ObservableQuery<TData>["setOptions"];
    setVariables: ObservableQuery<TData>["setVariables"];
    startPolling: ObservableQuery<TData>["startPolling"];
    stopPolling: ObservableQuery<TData>["stopPolling"];
    subscribeToMore: ObservableQuery<TData>["subscribeToMore"];
    updateQuery: ObservableQuery<TData>["updateQuery"];
}
declare type ReadableQuery<TData> = ReadableResult<TData> & ObservableQueryExtensions<TData>;

declare function query<TData = unknown, TVariables = unknown>(query: DocumentNode, options?: Omit<WatchQueryOptions<TVariables, TData>, "query">): ReadableQuery<TData>;

declare function restore<TData = unknown, TVariables = OperationVariables>(query: DocumentNode, options: Omit<DataProxy.WriteQueryOptions<TData, TVariables>, "query">): void;

declare function subscribe<TData = unknown, TVariables = unknown>(query: DocumentNode, options?: Omit<SubscriptionOptions<TVariables>, "query">): ReadableResult<TData>;

export { ReadableQuery, ReadableResult, Result, getClient, mutation, observableToReadable, query, restore, setClient, subscribe };
