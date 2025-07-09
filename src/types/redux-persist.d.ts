

declare module 'redux-persist-indexeddb-storage' {
  import { Storage } from 'redux-persist';

  interface Options {
    name?: string;
    storeName?: string;
  }

  const createIdbStorage: (options?: Options) => Storage;
  export default createIdbStorage;
}
