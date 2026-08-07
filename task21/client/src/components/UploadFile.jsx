import { useState } from "react";
import { supabase } from "../supabase";

function UploadFile() {

  const [file, setFile] = useState(null);

  const upload = async () => {

    if (!file) {
      alert("Select File");
      return;
    }

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("files")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
    } else {
      alert("File Uploaded Successfully");
      window.location.reload();
    }

  };

  return (
    <div>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>Upload</button>

    </div>
  );
}

export default UploadFile;