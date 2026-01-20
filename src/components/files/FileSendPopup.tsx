
import React, { useState } from 'react';
import { X, FileText, FileSpreadsheet, FileImage, File, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface FileSendPopupProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  onSubmit: (fileData: any) => Promise<void>;
  userId: string;
}

export const FileSendPopup: React.FC<FileSendPopupProps> = ({
  isOpen,
  onClose,
  leadId,
  leadName,
  onSubmit,
  userId,
}) => {
  const [formData, setFormData] = useState({
    fileName: '',
    fileType: 'contract',
    description: '',
    size: '2.4 MB', // Mock size
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fileTypes = [
    { value: 'contract', label: 'Contract', icon: FileText, color: 'bg-blue-100 text-blue-800' },
    { value: 'invoice', label: 'Invoice', icon: FileSpreadsheet, color: 'bg-green-100 text-green-800' },
    { value: 'proposal', label: 'Proposal', icon: File, color: 'bg-purple-100 text-purple-800' },
    { value: 'disclosure', label: 'Disclosure', icon: FileText, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'photo', label: 'Property Photos', icon: FileImage, color: 'bg-pink-100 text-pink-800' },
    { value: 'other', label: 'Other Document', icon: File, color: 'bg-gray-100 text-gray-800' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ 
        ...prev, 
        fileName: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fileData = {
        ...formData,
        leadId,
        leadName,
        sentBy: userId,
        date: new Date().toISOString(),
        fileName: selectedFile ? selectedFile.name : formData.fileName,
      };

      await onSubmit(fileData);
      
      toast({
        title: 'File Sent',
        description: `File has been sent to ${leadName} successfully.`,
      });
      
      onClose();
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-green-700 to-green-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Send File</h3>
                <p className="mt-1 text-green-100 text-sm">to {leadName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white transition-colors rounded-full hover:bg-white/20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* File Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {fileTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, fileType: type.value }))}
                        className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center ${
                          formData.fileType === type.value
                            ? 'border-green-600 bg-green-50 dark:bg-green-900/20 shadow-sm'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1 ${type.color.split(' ')[1]}`} />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* File Upload Simulation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Upload className="inline w-4 h-4 mr-1" />
                  Select File *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.xlsx,.jpg,.png"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {selectedFile ? selectedFile.name : 'Click to select file'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        PDF, Word, Excel, or Images (Max 10MB)
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        {selectedFile ? 'Change File' : 'Browse Files'}
                      </Button>
                    </div>
                  </label>
                </div>
              </div>

              {/* File Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  File Name *
                </label>
                <input
                  type="text"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Purchase_Contract_v1.pdf"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  placeholder="Describe what this file contains and any important notes..."
                  required
                />
              </div>

              {/* File Info */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-600 dark:text-gray-400">Document Type:</span>
                  <span className="font-medium capitalize">
                    {fileTypes.find(t => t.value === formData.fileType)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 mt-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                * Required fields
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.fileName || !formData.description}
                  className="px-6 py-2 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg hover:from-green-800 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send File
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};