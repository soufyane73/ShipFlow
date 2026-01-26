import { useState } from 'react';
import { Search, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';

export function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setShowResults(true);
    }
  };

  const trackingHistory = [
    { status: 'Delivered', location: 'New York, NY', date: '2024-12-03', time: '02:45 PM', description: 'Package delivered successfully', completed: true },
    { status: 'Out for Delivery', location: 'New York, NY', date: '2024-12-03', time: '09:30 AM', description: 'Package is out for delivery', completed: true },
    { status: 'Arrived at Facility', location: 'Newark, NJ', date: '2024-12-02', time: '11:20 PM', description: 'Package arrived at local facility', completed: true },
    { status: 'In Transit', location: 'Philadelphia, PA', date: '2024-12-02', time: '03:15 PM', description: 'Package in transit to destination', completed: true },
    { status: 'Departed Facility', location: 'Dallas, TX', date: '2024-12-01', time: '06:00 PM', description: 'Package departed origin facility', completed: true },
    { status: 'Picked Up', location: 'Dallas, TX', date: '2024-12-01', time: '09:00 AM', description: 'Package picked up from sender', completed: true },
  ];

  const recentTracking = [
    { trackingId: 'SH-2847', status: 'In Transit', lastUpdate: '2 hours ago', destination: 'New York, NY' },
    { trackingId: 'SH-2846', status: 'Delivered', lastUpdate: '4 hours ago', destination: 'Los Angeles, CA' },
    { trackingId: 'SH-2845', status: 'Processing', lastUpdate: '5 hours ago', destination: 'Chicago, IL' },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Package Tracking</h1>

      {/* Tracking Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <h2 className="text-gray-900 mb-4">Track Your Shipment</h2>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter tracking number (e.g., SH-2847)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleTrack}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Track
          </button>
        </div>
      </div>

      {showResults && (
        <>
          {/* Tracking Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-gray-900 mb-2">Tracking Details</h2>
                <p className="text-gray-600">Tracking Number: {trackingNumber || 'SH-2847'}</p>
              </div>
              <span className="px-4 py-2 bg-green-500 text-white rounded-lg">Delivered</span>
            </div>

            {/* Shipment Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-6 border-b border-gray-200">
              <div>
                <p className="text-gray-600 mb-1">From</p>
                <p className="text-gray-900">Dallas, TX 75001</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">To</p>
                <p className="text-gray-900">New York, NY 10001</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Est. Delivery</p>
                <p className="text-gray-900">Dec 3, 2024</p>
              </div>
            </div>

            {/* Timeline */}
            <h3 className="text-gray-900 mb-4">Tracking History</h3>
            <div className="relative">
              {trackingHistory.map((event, index) => (
                <div key={index} className="flex gap-4 pb-8 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {event.status === 'Delivered' && <CheckCircle className="w-6 h-6 text-white" />}
                      {event.status === 'Out for Delivery' && <Truck className="w-6 h-6 text-white" />}
                      {event.status === 'Picked Up' && <Package className="w-6 h-6 text-white" />}
                      {event.status !== 'Delivered' && event.status !== 'Out for Delivery' && event.status !== 'Picked Up' && (
                        <MapPin className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {index !== trackingHistory.length - 1 && (
                      <div className={`w-0.5 h-full absolute top-10 ${
                        event.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-gray-900 mb-1">{event.status}</p>
                    <p className="text-gray-600 mb-1">{event.location}</p>
                    <p className="text-gray-600">{event.description}</p>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Recent Tracking */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Recently Tracked</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentTracking.map((item) => (
            <div key={item.trackingId} className="p-6 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{item.trackingId}</p>
                  <p className="text-gray-600">Destination: {item.destination}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-white ${
                    item.status === 'Delivered' ? 'bg-green-500' :
                    item.status === 'In Transit' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-gray-600 mt-2">{item.lastUpdate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
