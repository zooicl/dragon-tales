import { saveSchema, type Save } from './game';
let dbPromise: Promise<IDBDatabase> | undefined;
function database() {
  return dbPromise ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('dragon-tales', 1);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains('saves')) request.result.createObjectStore('saves'); };
    request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); request.onblocked = () => reject(new Error('저장소가 잠겨 있어요.'));
  });
}
export async function load(): Promise<Save | null> {
  const db = await database();
  return new Promise((resolve, reject) => { const r = db.transaction('saves').objectStore('saves').get('main-save'); r.onsuccess = () => { try { resolve(r.result ? saveSchema.parse(r.result) : null); } catch (e) { reject(e); } }; r.onerror = () => reject(r.error); });
}
export async function persist(save: Save | null) {
  const db = await database();
  return new Promise<void>((resolve, reject) => { const tx = db.transaction('saves', 'readwrite'); const store = tx.objectStore('saves'); if (save) store.put(save, 'main-save'); else store.delete('main-save'); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error); });
}
