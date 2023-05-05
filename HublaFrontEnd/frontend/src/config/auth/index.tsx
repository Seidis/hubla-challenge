export const firebaseUser = () => {
  const asyncForEach = (
    array: string | any[],
    callback: {
      (store: any, next: any): void;
      (arg0: any, arg1: () => any): any;
    },
    done: { (): void; (): any }
  ) => {
    const runAndWait = (i: number) => {
      if (i === array.length) return done();
      return callback(array[i], () => runAndWait(i + 1));
    };
    return runAndWait(0);
  };

  const dump = {};
  let alowed = false;
  const dbRequest = window.indexedDB.open("firebaseLocalStorageDb");
  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const stores = ["firebaseLocalStorage"];

    const tx = db.transaction(stores);
    asyncForEach(
      stores,
      (store, next) => {
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => {
          // @ts-ignore
          dump[store] = req.result;
          next();
        };
      },
      () => {
        // @ts-ignore
        if (dump?.firebaseLocalStorage[0]?.value) {
          alowed = true;
        }
      }
    );
  };
  return alowed;
};
