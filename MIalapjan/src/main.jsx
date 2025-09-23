import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Alkalmazas from './Components/Alkalmazas';
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap és komponenseinek importálása
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Alkalmazas />
    </BrowserRouter>
  </React.StrictMode>
);
