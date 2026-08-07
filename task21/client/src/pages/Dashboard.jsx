import UploadFile from "../components/UploadFile";
import FileList from "../components/FileList";
import { supabase } from "../supabase";

function Dashboard() {

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="container">

      <h1>Dashboard</h1>

      <UploadFile />

      <FileList />

      <button onClick={logout}>Logout</button>

    </div>
  );
}

export default Dashboard;