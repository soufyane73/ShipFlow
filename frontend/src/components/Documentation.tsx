import { FileText, Download, Upload, Eye } from 'lucide-react';

export function Documentation() {
  const documents = [
    { id: 'DOC-9823', name: 'Bill of Lading - SH-2847', type: 'BOL', shipmentId: 'SH-2847', uploadedBy: 'John Smith', date: '2024-12-01', size: '245 KB' },
    { id: 'DOC-9822', name: 'Commercial Invoice - SH-2846', type: 'Invoice', shipmentId: 'SH-2846', uploadedBy: 'Sarah Johnson', date: '2024-12-01', size: '189 KB' },
    { id: 'DOC-9821', name: 'Packing List - SH-2845', type: 'Packing List', shipmentId: 'SH-2845', uploadedBy: 'Mike Davis', date: '2024-12-02', size: '156 KB' },
    { id: 'DOC-9820', name: 'Customs Declaration - SH-2844', type: 'Customs', shipmentId: 'SH-2844', uploadedBy: 'John Smith', date: '2024-12-02', size: '312 KB' },
    { id: 'DOC-9819', name: 'Delivery Receipt - SH-2843', type: 'Receipt', shipmentId: 'SH-2843', uploadedBy: 'Sarah Johnson', date: '2024-12-03', size: '98 KB' },
    { id: 'DOC-9818', name: 'Insurance Certificate - SH-2842', type: 'Insurance', shipmentId: 'SH-2842', uploadedBy: 'Mike Davis', date: '2024-12-03', size: '421 KB' },
  ];

  const documentTypes = [
    { name: 'Bill of Lading', count: 342, icon: FileText },
    { name: 'Commercial Invoice', count: 568, icon: FileText },
    { name: 'Packing List', count: 445, icon: FileText },
    { name: 'Customs', count: 123, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Documentation Management</h1>

      {/* Document Type Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {documentTypes.map((docType) => {
          const Icon = docType.icon;
          return (
            <div key={docType.name} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">{docType.name}</p>
                  <p className="text-gray-900">{docType.count} docs</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-gray-900 mb-4">Upload Documents</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-900 mb-2">Click to upload or drag and drop</p>
          <p className="text-gray-600">PDF, DOC, DOCX, or images up to 10MB</p>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900">Recent Documents</h2>
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Bill of Lading</option>
              <option>Commercial Invoice</option>
              <option>Packing List</option>
              <option>Customs</option>
              <option>Receipt</option>
              <option>Insurance</option>
            </select>
            <input
              type="text"
              placeholder="Search documents..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">Document ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-gray-600">Type</th>
                <th className="px-6 py-3 text-left text-gray-600">Shipment ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Uploaded By</th>
                <th className="px-6 py-3 text-left text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-gray-600">Size</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{doc.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doc.type}</td>
                  <td className="px-6 py-4 text-gray-900">{doc.shipmentId}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.uploadedBy}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
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
