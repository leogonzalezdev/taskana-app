import React, { useState, useEffect } from 'react';
import Todo from 'features/Todo';
import Layout from 'components/Layout';
import Login from 'Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div>
      <Layout setIsLoggedIn={setIsLoggedIn}>
        <Todo />
      </Layout>
    </div>
  );
}

export default App
