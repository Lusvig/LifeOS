import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardHeader, CardTitle, CardContent } from '@lifeos/ui';
import { Upload, ImageIcon, DollarSign } from 'lucide-react';

interface Receipt {
  id: string;
  file: File;
  preview: string;
  amount: string;
  category: string;
}

export default function Finance(): JSX.Element {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newReceipt: Receipt = {
          id: Math.random().toString(36),
          file,
          preview: reader.result as string,
          amount: '',
          category: '',
        };
        setReceipts((prev) => [newReceipt, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
  });

  const updateReceipt = (id: string, updates: Partial<Receipt>) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    );
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-background via-background to-surface/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Finance Hub</h1>
          <p className="text-white/50">Track spending & manage receipts</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Upload Receipt</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? 'border-primary bg-primary/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto mb-4 text-white/50" size={48} />
                  <p className="text-white/70 mb-2">Drag & drop receipts here</p>
                  <p className="text-sm text-white/50">or click to select files</p>
                </div>

                {receipts.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Recent Receipts</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {receipts.map((receipt) => (
                        <div
                          key={receipt.id}
                          onClick={() => setSelectedReceipt(receipt.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedReceipt === receipt.id
                              ? 'border-primary bg-primary/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <ImageIcon size={20} className="text-white/50" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {receipt.file.name}
                              </p>
                              <p className="text-xs text-white/50">
                                {(receipt.file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-5">
            {selectedReceipt && receipts.find((r) => r.id === selectedReceipt) && (
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon size={20} />
                    Receipt Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const receipt = receipts.find((r) => r.id === selectedReceipt)!;
                    return (
                      <div className="space-y-4">
                        <img
                          src={receipt.preview}
                          alt="Receipt"
                          className="w-full rounded-lg border border-white/10 mb-4 max-h-64 object-cover"
                        />

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Amount
                          </label>
                          <div className="flex items-center gap-2">
                            <DollarSign size={20} className="text-accent" />
                            <input
                              type="number"
                              placeholder="0.00"
                              value={receipt.amount}
                              onChange={(e) =>
                                updateReceipt(receipt.id, {
                                  amount: e.target.value,
                                })
                              }
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Category
                          </label>
                          <select
                            value={receipt.category}
                            onChange={(e) =>
                              updateReceipt(receipt.id, {
                                category: e.target.value,
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                          >
                            <option value="">Select category</option>
                            <option value="food">Food & Dining</option>
                            <option value="transport">Transport</option>
                            <option value="shopping">Shopping</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="utilities">Utilities</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <button className="w-full mt-6 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-all font-medium">
                          Save Receipt
                        </button>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
