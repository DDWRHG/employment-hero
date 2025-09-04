import React, { useState } from 'react';
import { Calendar, FileText, Users, Heart, Plus, Download, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const EmploymentHero = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: 'Sarah Johnson',
      type: 'Annual Leave',
      startDate: '2025-09-15',
      endDate: '2025-09-20',
      days: 6,
      status: 'pending',
      reason: 'Family vacation'
    },
    {
      id: 2,
      employee: 'Mike Chen',
      type: 'Sick Leave',
      startDate: '2025-09-01',
      endDate: '2025-09-02',
      days: 2,
      status: 'approved',
      reason: 'Medical appointment'
    }
  ]);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Employee Handbook 2025',
      type: 'Policy',
      category: 'HR Policies',
      uploadDate: '2025-01-15',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Remote Work Policy',
      type: 'Policy',
      category: 'Work Policies',
      uploadDate: '2025-02-01',
      size: '1.2 MB'
    },
    {
      id: 3,
      name: 'John Doe - Employment Contract',
      type: 'Contract',
      category: 'Contracts',
      uploadDate: '2025-03-10',
      size: '856 KB'
    }
  ]);

  const [shoutouts, setShoutouts] = useState([
    {
      id: 1,
      from: 'Emily Davis',
      to: 'Alex Turner',
      message: 'Amazing work on the client presentation! Your attention to detail really made the difference.',
      date: '2025-09-03',
      category: 'Excellence'
    },
    {
      id: 2,
      from: 'David Wilson',
      to: 'Team Marketing',
      message: 'Fantastic job on the Q3 campaign launch. The results exceeded all expectations!',
      date: '2025-09-02',
      category: 'Team Work'
    }
  ]);

  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [showShoutoutForm, setShowShoutoutForm] = useState(false);

  const updateLeaveStatus = (id, status) => {
    setLeaves(leaves.map(leave => 
      leave.id === id ? { ...leave, status } : leave
    ));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Leaves</h3>
              <p className="text-3xl font-bold text-blue-600">
                {leaves.filter(l => l.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
              <p className="text-3xl font-bold text-green-600">{documents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Shoutouts</h3>
              <p className="text-3xl font-bold text-red-600">{shoutouts.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {leaves.slice(0, 3).map(leave => (
              <div key={leave.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{leave.employee} requested {leave.type}</p>
                  <p className="text-sm text-gray-600">{leave.startDate} to {leave.endDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeaves = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
        <button
          onClick={() => setShowLeaveForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Leave Request
        </button>
      </div>

      {showLeaveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Submit Leave Request</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  name="employee"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  name="leaveType"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select leave type</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Parental Leave">Parental Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  name="reason"
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    const employeeName = document.querySelector('[name="employee"]').value;
                    const leaveType = document.querySelector('[name="leaveType"]').value;
                    const startDate = document.querySelector('[name="startDate"]').value;
                    const endDate = document.querySelector('[name="endDate"]').value;
                    const reason = document.querySelector('[name="reason"]').value;
                    
                    if (employeeName && leaveType && startDate && endD
