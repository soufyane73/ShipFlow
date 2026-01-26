import { useState } from 'react';
import { RotateCcw, CheckCircle, XCircle, Clock } from 'lucide-react';

export function Returns() {
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null);

  const returns = [
    { id: 'RT-8472', shipmentId: 'SH-2840', customer: 'Acme Corp', reason: 'Damaged Item', status: 'Pending Review', date: '2024-12-01', value: '$245.00' },
    { id: 'RT-8471', shipmentId: 'SH-2835', customer: 'TechStart Inc', reason: 'Wrong Item', status: 'Approved', date: '2024-11-30', value: '$389.00' },
    { id: 'RT-8470', shipmentId: 'SH-2828', customer: 'Global Supplies', reason: 'Customer Requested', status: 'In Transit', date: '2024-11-29', value: '$156.00' },
    { id: 'RT-8469', shipmentId: 'SH-2820', customer: 'MegaMart', reason: 'Defective', status: 'Completed', date: '2024-11-28', value: '$512.00' },
    { id: 'RT-8468', shipmentId: 'SH-2815', customer: 'Prime Retail', reason: 'Not as Described', status: 'Rejected', date: '2024-11-27', value: '$98.00' },
  ];

  const stats = [
    { label: 'Pending Returns', value: '23', icon: Clock, color: 'orange' },
    { label: 'Approved', value: '156', icon: CheckCircle, color: 'green' },
    { label: 'Rejected', value: '12', icon: XCircle, color: 'red' },
    { label: 'Total Value', value: '$45,230', icon: RotateCcw, color: 'blue' },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Returns Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900">Return Requests</h2>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Pending Review</option>
            <option>Approved</option>
            <option>In Transit</option>
            <option>Completed</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">Return ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Shipment ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Customer</th>
                <th className="px-6 py-3 text-left text-gray-600">Reason</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-gray-600">Value</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((returnItem) => (
                <tr key={returnItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{returnItem.id}</td>
                  <td className="px-6 py-4 text-gray-900">{returnItem.shipmentId}</td>
                  <td className="px-6 py-4 text-gray-900">{returnItem.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{returnItem.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      returnItem.status === 'Completed' ? 'bg-green-500' :
                      returnItem.status === 'Approved' ? 'bg-blue-500' :
                      returnItem.status === 'In Transit' ? 'bg-purple-500' :
                      returnItem.status === 'Rejected' ? 'bg-red-500' :
                      'bg-orange-500'
                    }`}>
                      {returnItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{returnItem.date}</td>
                  <td className="px-6 py-4 text-gray-900">{returnItem.value}</td>
                  <td className="px-6 py-4">
                    {returnItem.status === 'Pending Review' && (
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                          Reject
                        </button>
                      </div>
                    )}
                    {returnItem.status !== 'Pending Review' && (
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
