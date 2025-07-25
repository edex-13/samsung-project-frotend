import { useMemo } from "react";
import {
  collection,
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

const useFirestoreCollection = (collectionName, options = {}) => {
  const { wheres = [], order = null, limitValue = 50, startAfterDoc = null, isGroup = false } = options;

  const q = useMemo(() => {
    const ref = isGroup ? collectionGroup(db, collectionName) : collection(db, collectionName);
    const constraints = [];
    wheres.forEach((c) => constraints.push(where(...c)));
    if (order) constraints.push(orderBy(order.field, order.direction));
    if (limitValue) constraints.push(limit(limitValue));
    if (startAfterDoc) constraints.push(startAfter(startAfterDoc));
    return query(ref, ...constraints);
  }, [collectionName, wheres, order, limitValue, startAfterDoc, isGroup]);

  const [snap, loading, error] = useCollection(q);

  return {
    data: snap?.docs.map((d) => ({ id: d.id, ...d.data() })) || [],
    loading,
    error,
    lastVisible: snap?.docs[snap.docs.length - 1] || null
  };
};

export default useFirestoreCollection; 