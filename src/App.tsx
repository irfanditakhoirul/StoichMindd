/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Chapter from './pages/Chapter';
import Quiz from './pages/Quiz';
import { useStore } from './store/useStore';

import ClassDetail from './pages/ClassDetail';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher-dashboard" 
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/class/:classId" 
          element={
            <ProtectedRoute>
              <ClassDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chapter/:id" 
          element={
            <ProtectedRoute>
              <Chapter />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz/:id" 
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
