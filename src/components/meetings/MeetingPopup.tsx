// components/meetings/MeetingPopup.tsx
import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface MeetingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  onSubmit: (meetingData: any) => Promise<void>;
  userId: string;
}

export const MeetingPopup: React.FC<MeetingPopupProps> = ({
  isOpen,
  onClose,
  leadId,
  leadName,
  onSubmit,
  userId,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    propertyId: '',
    propertyAddress: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    duration: 60,
    type: 'showing',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const meetingTypes = [
    { value: 'showing', label: 'Property Showing' },
    { value: 'consultation', label: 'Initial Consultation' },
    { value: 'follow_up', label: 'Follow-up Meeting' },
    { value: 'closing', label: 'Closing Meeting' },
    { value: 'inspection', label: 'Property Inspection' },
  ];

  const durationOptions = [
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const meetingData = {
        ...formData,
        leadId,
        leadName,
        agentId: userId,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      };

      await onSubmit(meetingData);
      
      toast({
        title: 'Meeting Scheduled',
        description: `Meeting with ${leadName} has been scheduled successfully.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule meeting. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 overflow-y-auto text-xs">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 to-emerald-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Schedule Meeting</h3>
                <p className="mt-1 text-emerald-100 text-sm">with {leadName}</p>
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
              {/* Meeting Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meeting Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Property Showing - Beverly Hills Estate"
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Meeting Type and Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Users className="inline w-4 h-4 mr-1" />
                    Meeting Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  >
                    {meetingTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Duration *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  >
                    {durationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Home className="inline w-4 h-4 mr-1" />
                  Property Address
                </label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., 1234 Sunset Boulevard, Beverly Hills"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Meeting Notes
                </label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  placeholder="Additional notes about the meeting..."
                />
              </div>
            </div>

             <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                * Required fields
              </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-2 py-4 mt-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
             
             
                <Button
                  type="button"
                  onClick={onClose}
                  variant='outline'
                  >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className='gradient-primary'
                  >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Meeting
                    </>
                  )}
                </Button>
              
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};