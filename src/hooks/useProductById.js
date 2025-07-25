import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

const useProductById = (id) => {
  const [docSnap, loading, error] = useDocument(id ? doc(db, "productos_scraping", id) : undefined);
  return { data: docSnap ? { id: docSnap.id, ...docSnap.data() } : null, loading, error };
};

export default useProductById; 