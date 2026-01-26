import { useState } from 'react';
import { Plus, Filter, Download, Search } from 'lucide-react';

export function Shipments() {
  const [showNewShipment, setShowNewShipment] = useState(false);

  const shipments = [
    { id: 'SH-2847', customer: 'Acme Corp', origin: 'Dallas, TX', destination: 'New York, NY', weight: '45 lbs', status: 'In Transit', date: '2024-12-01' },
    { id: 'SH-2846', customer: 'TechStart Inc', origin: 'Seattle, WA', destination: 'Los Angeles, CA', weight: '32 lbs', status: 'Delivered', date: '2024-12-01' },
    { id: 'SH-2845', customer: 'Global Supplies', origin: 'Miami, FL', destination: 'Chicago, IL', weight: '67 lbs', status: 'Processing', date: '2024-12-02' },
    { id: 'SH-2844', customer: 'MegaMart', origin: 'Boston, MA', destination: 'Houston, TX', weight: '23 lbs', status: 'In Transit', date: '2024-12-02' },
    { id: 'SH-2843', customer: 'Prime Retail', origin: 'Denver, CO', destination: 'Phoenix, AZ', weight: '51 lbs', status: 'Out for Delivery', date: '2024-12-03' },
    { id: 'SH-2842', customer: 'QuickShop', origin: 'Portland, OR', destination: 'San Diego, CA', weight: '18 lbs', status: 'Delivered', date: '2024-12-03' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Shipments</h1>
        <button 
          onClick={() => setShowNewShipment(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          New Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search shipments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Processing</option>
            <option>In Transit</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            More Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-gray-600">Shipment ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Customer</th>
                <th className="px-6 py-3 text-left text-gray-600">Origin</th>
                <th className="px-6 py-3 text-left text-gray-600">Destination</th>
                <th className="px-6 py-3 text-left text-gray-600">Weight</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 text-gray-900">{shipment.id}</td>
                  <td className="px-6 py-4 text-gray-900">{shipment.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{shipment.origin}</td>
                  <td className="px-6 py-4 text-gray-600">{shipment.destination}</td>
                  <td className="px-6 py-4 text-gray-600">{shipment.weight}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      shipment.status === 'Delivered' ? 'bg-green-500' :
                      shipment.status === 'In Transit' ? 'bg-blue-500' :
                      shipment.status === 'Out for Delivery' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{shipment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Shipment Modal */}
      {showNewShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Create New Shipment</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Customer Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Customer Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Origin Address</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Destination Address</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Weight (lbs)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Service Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Standard</option>
                    <option>Express</option>
                    <option>Overnight</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Special Instructions</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewShipment(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Shipment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
