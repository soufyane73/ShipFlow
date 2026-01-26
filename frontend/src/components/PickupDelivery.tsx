import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

export function PickupDelivery() {
  const [activeTab, setActiveTab] = useState('pickups');

  const pickups = [
    { id: 'PU-1023', customer: 'Acme Corp', address: '123 Main St, Dallas, TX', scheduledTime: '2024-12-03 09:00 AM', status: 'Scheduled', driver: 'John Smith' },
    { id: 'PU-1024', customer: 'TechStart Inc', address: '456 Oak Ave, Seattle, WA', scheduledTime: '2024-12-03 10:30 AM', status: 'In Progress', driver: 'Sarah Johnson' },
    { id: 'PU-1025', customer: 'Global Supplies', address: '789 Pine Rd, Miami, FL', scheduledTime: '2024-12-03 02:00 PM', status: 'Scheduled', driver: 'Mike Davis' },
  ];

  const deliveries = [
    { id: 'DL-5847', customer: 'MegaMart', address: '321 Elm St, Houston, TX', scheduledTime: '2024-12-03 11:00 AM', status: 'Out for Delivery', driver: 'John Smith' },
    { id: 'DL-5848', customer: 'Prime Retail', address: '654 Maple Dr, Phoenix, AZ', scheduledTime: '2024-12-03 01:00 PM', status: 'Out for Delivery', driver: 'Sarah Johnson' },
    { id: 'DL-5849', customer: 'QuickShop', address: '987 Cedar Ln, San Diego, CA', scheduledTime: '2024-12-03 03:00 PM', status: 'Scheduled', driver: 'Mike Davis' },
  ];

  const data = activeTab === 'pickups' ? pickups : deliveries;

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Pickup & Delivery Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('pickups')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'pickups'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Scheduled Pickups
        </button>
        <button
          onClick={() => setActiveTab('deliveries')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'deliveries'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Scheduled Deliveries
        </button>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Today's Schedule</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Dec 3, 2024</span>
              </div>
            </div>
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900">{item.id}</p>
                        <span className={`px-2 py-1 rounded-full text-white ${
                          item.status === 'Scheduled' ? 'bg-blue-500' :
                          item.status === 'In Progress' ? 'bg-orange-500' :
                          'bg-purple-500'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-900 mb-1">{item.customer}</p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{item.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{item.scheduledTime}</span>
                      </div>
                      <p className="text-gray-600 mt-2">Driver: {item.driver}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left">
              Schedule New Pickup
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left">
              Schedule New Delivery
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
              View Route Optimization
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
              Driver Assignments
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-gray-900 mb-3">Active Drivers</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">John Smith</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Sarah Johnson</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Mike Davis</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
