import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/firebase";

const NotePage = () => {
  const router = useRouter();
  const noteId = router.query.id;
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    if (noteId) {
      const fetchNoteData = async () => {
        const noteRef = doc(db, "notes", noteId);
        const noteSnap = await getDoc(noteRef);

        if (noteSnap.exists()) {
          setNoteData(noteSnap.data());
        } else {
          console.error("Note not found");
        }
      };

      fetchNoteData();
    }
  }, [noteId]);

  if (!noteData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 w-[100%] break-words overflow-x-hidden">
      <h1 className="text-xl font-bold text-center py-6">{noteData.title}</h1>
      <p>{noteData.content}</p>
    </div>
  );
};

export default NotePage;
