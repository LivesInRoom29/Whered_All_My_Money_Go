//indexDB code
let db;

//functions
const checkDatabase = () => {
  // open a transaction on your pending db
  const transaction = db.transaction(["pending"], "readwrite");
  // access your pending object store
  const store = transaction.objectStore("pending");
  // get all records from store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    // if there are record in the store, use the post API to add those records to the MongoDb
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        // if successful, open a transaction on your pending db
        const transaction = db.transaction(["pending"], "readwrite");

        // access your pending object store
        const store = transaction.objectStore("pending");

        // clear all items in your store
        store.clear();
      });
    }
  };
}

// This function will be called in index.js if offline to store the record in the IndexDB
export function saveRecord (record) {
  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction(["pending"], "readwrite");

  // access your pending object store
  const store = transaction.objectStore("pending");

  // add record to your store with add method.
  store.add(record);
}


// create a new db request for "transactions database"
const request = indexedDB.open("transactions", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  db.createObjectStore("pending", {autoIncrement: true});
};

request.onsuccess = (event) => {
  db = event.target.result;

  //check if app is online before reading from db
  if (navigator.online) {
    checkDatabase();
  }
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);