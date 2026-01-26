import { Package, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';

export function Warehouse() {
  const inventory = [
    { sku: 'SKU-10234', name: 'Electronics - Laptop', category: 'Electronics', quantity: 245, location: 'A-12-03', reorderPoint: 50, status: 'In Stock' },
    { sku: 'SKU-10235', name: 'Office Supplies - Paper', category: 'Office', quantity: 15, location: 'B-05-12', reorderPoint: 100, status: 'Low Stock' },
    { sku: 'SKU-10236', name: 'Clothing - T-Shirts', category: 'Apparel', quantity: 456, location: 'C-08-04', reorderPoint: 200, status: 'In Stock' },
    { sku: 'SKU-10237', name: 'Books - Fiction', category: 'Books', quantity: 89, location: 'D-15-07', reorderPoint: 75, status: 'In Stock' },
    { sku: 'SKU-10238', name: 'Sports Equipment - Balls', category: 'Sports', quantity: 5, location: 'E-03-09', reorderPoint: 25, status: 'Critical' },
    { sku: 'SKU-10239', name: 'Home Goods - Towels', category: 'Home', quantity: 312, location: 'F-11-02', reorderPoint: 150, status: 'In Stock' },
  ];

  const warehouseStats = [
    { label: 'Total Items', value: '1,122', change: '+5.2%', icon: Package },
    { label: 'Low Stock Items', value: '23', change: '+3', icon: AlertTriangle },
    { label: 'Warehouse Capacity', value: '87%', change: '+2%', icon: TrendingUp },
    { label: 'Incoming Today', value: '45', change: '+12', icon: ArrowUpRight },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Warehouse & Inventory</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {warehouseStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-gray-900">{stat.value}</p>
                  <p className="text-blue-600 mt-1">{stat.change}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900">Inventory Overview</h2>
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Office</option>
              <option>Apparel</option>
              <option>Books</option>
              <option>Sports</option>
              <option>Home</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Item
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">SKU</th>
                <th className="px-6 py-3 text-left text-gray-600">Product Name</th>
                <th className="px-6 py-3 text-left text-gray-600">Category</th>
                <th className="px-6 py-3 text-left text-gray-600">Quantity</th>
                <th className="px-6 py-3 text-left text-gray-600">Location</th>
                <th className="px-6 py-3 text-left text-gray-600">Reorder Point</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.sku} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4 text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className={item.quantity <= item.reorderPoint ? 'text-red-600' : 'text-gray-900'}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.location}</td>
                  <td className="px-6 py-4 text-gray-600">{item.reorderPoint}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      item.status === 'In Stock' ? 'bg-green-500' :
                      item.status === 'Low Stock' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-900 mb-3">Low Stock Alerts</h3>
          <p className="text-gray-600 mb-4">23 items need restocking</p>
          <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            View All
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-900 mb-3">Pending Receipts</h3>
          <p className="text-gray-600 mb-4">12 shipments to receive</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Process
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-900 mb-3">Inventory Report</h3>
          <p className="text-gray-600 mb-4">Generate monthly report</p>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
