import { collection, query, where, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getProductsPage = async ({ comercio, modelo, lastDoc }) => {
  const ref = collection(db, "productos_scraping");
  const q = query(
    ref,
    where("comercio", "==", comercio),
    where("modelo_detectado", "==", modelo),
    orderBy("fecha_scraping", "desc"),
    limit(20),
    startAfter(lastDoc)
  );
  const snap = await getDocs(q);
  return snap;
}; 