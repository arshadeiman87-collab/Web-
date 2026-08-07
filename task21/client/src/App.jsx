import { useEffect, useState } from "react";
import { supabase } from "./supabase";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {session ? (
        <Dashboard session={session} />
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;