import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchFiles() {
      try {
        const { data, error } = await supabase.storage
          .from("files")
          .list("", {
            limit: 100,
            offset: 0,
          });

        if (error) {
          throw error;
        }

        if (isMounted) {
          setFiles(data || []);
        }
      } catch (err) {
        alert(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchFiles();

    return () => {
      isMounted = false;
    };
  }, []);

  async function downloadFile(fileName) {
    try {
      const { data, error } = await supabase.storage
        .from("files")
        .download(fileName);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Your Files</h2>

      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p>No files uploaded.</p>
      ) : (
        files.map((file) => (
          <div
            key={file.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <span>{file.name}</span>

            <button onClick={() => downloadFile(file.name)}>
              Download
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default FileList;