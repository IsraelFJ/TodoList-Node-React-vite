// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header-title">
          📝 Todoist App
        </h1>
        <p className="header-subtitle">
          Organize suas tarefas de forma simples e eficiente
        </p>
      </div>
    </header>
  );
};

export default Header;