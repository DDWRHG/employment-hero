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
                    
                    if (employeeName && leaveType && startDate && endDate) {
                      const newLeave = {
                        id: leaves.length + 1,
                        employee: employeeName,
                        type: leaveType,
                        startDate: startDate,
                        endDate: endDate,
                        days: Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1,
                        status: 'pending',
                        reason: reason
                      };
                      setLeaves([...leaves, newLeave]);
                      setShowLeaveForm(false);
                    }
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowLeaveForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Dates</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Days</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(leave => (
                  <tr key={leave.id} className="border-b">
                    <td className="py-3 px-4">{leave.employee}</td>
                    <td className="py-3 px-4">{leave.type}</td>
                    <td className="py-3 px-4">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="py-3 px-4">{leave.days}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getStatusIcon(leave.status)}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {leave.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateLeaveStatus(leave.id, 'approved')}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateLeaveStatus(leave.id, 'rejected')}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Documents & Policies</h2>
        <button
          onClick={() => setShowDocumentForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      {showDocumentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                <input
                  type="text"
                  name="docName"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="docCategory"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="HR Policies">HR Policies</option>
                  <option value="Work Policies">Work Policies</option>
                  <option value="Contracts">Contracts</option>
                  <option value="Legal Documents">Legal Documents</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    const docName = document.querySelector('[name="docName"]').value;
                    const category = document.querySelector('[name="docCategory"]').value;
                    
                    if (docName && category) {
                      const newDoc = {
                        id: documents.length + 1,
                        name: docName,
                        type: category.includes('Contract') ? 'Contract' : 'Policy',
                        category: category,
                        uploadDate: new Date().toISOString().split('T')[0],
                        size: '1.2 MB'
                      };
                      setDocuments([...documents, newDoc]);
                      setShowDocumentForm(false);
                    }
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setShowDocumentForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {doc.type}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mt-4 mb-2">{doc.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Category: {doc.category}</p>
            <p className="text-sm text-gray-500 mb-4">
              Uploaded: {doc.uploadDate} • {doc.size}
            </p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-md hover:bg-blue-100 flex items-center justify-center">
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              <button className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-md hover:bg-green-100 flex items-center justify-center">
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderShoutouts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Employee Shoutouts</h2>
        <button
          onClick={() => setShowShoutoutForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
        >
          <Heart className="w-4 h-4 mr-2" />
          Give Shoutout
        </button>
      </div>

      {showShoutoutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Give a Shoutout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="from"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shoutout To</label>
                <input
                  type="text"
                  name="to"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select category</option>
                  <option value="Excellence">Excellence</option>
                  <option value="Team Work">Team Work</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Innovation">Innovation</option>
                  <option value="Customer Service">Customer Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Share what made this person amazing..."
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    const from = document.querySelector('[name="from"]').value;
                    const to = document.querySelector('[name="to"]').value;
                    const category = document.querySelector('[name="category"]').value;
                    const message = document.querySelector('[name="message"]').value;
                    
                    if (from && to && category && message) {
                      const newShoutout = {
                        id: shoutouts.length + 1,
                        from: from,
                        to: to,
                        message: message,
                        date: new Date().toISOString().split('T')[0],
                        category: category
                      };
                      setShoutouts([newShoutout, ...shoutouts]);
                      setShowShoutoutForm(false);
                    }
                  }}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  Send Shoutout
                </button>
                <button
                  type="button"
                  onClick={() => setShowShoutoutForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {shoutouts.map(shoutout => (
          <div key={shoutout.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-semibold text-gray-900">{shoutout.from}</span>
                <span className="text-gray-600 mx-2">→</span>
                <span className="font-semibold text-gray-900">{shoutout.to}</span>
              </div>
              <div className="text-right">
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {shoutout.category}
                </span>
                <p className="text-sm text-gray-500 mt-1">{shoutout.date}</p>
              </div>
            </div>
            <p className="text-gray-700">{shoutout.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Employment Hero</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('leaves')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'leaves'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Leaves
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'documents'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('shoutouts')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'shoutouts'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Shoutouts
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'leaves' && renderLeaves()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'shoutouts' && renderShoutouts()}
        </div>
      </main>
    </div>
  );
};

export default EmploymentHero;
