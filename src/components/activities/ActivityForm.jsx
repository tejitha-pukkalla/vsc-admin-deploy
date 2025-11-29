
// import { useState, useEffect } from 'react';
// import activityService from '../../services/activityService';

// const ActivityForm = ({ activity, onClose, onSuccess, setError }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'Adventure Parks',
//     venue: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     latitude: '',
//     longitude: '',
//     startDate: '',
//     endDate: '',
//     duration: '',
//     price: '',
//     priceUnit: 'per person',
//     discountPercentage: '0',
//     maxParticipants: '',
//     maxParticipantsPerSlot: '',
//     minAge: '',
//     maxAge: '',
//     videoUrl: '',
//     organizerName: '',
//     organizerContact: '',
//     organizerEmail: '',
//     status: 'Draft',
//     cancellationPolicy: '',
//     termsAndConditions: '',
//     safetyRules: 'Please follow all safety instructions provided by our trained staff.'
//   });

//   const [arrayFields, setArrayFields] = useState({
//     availableDays: [],
//     timeSlots: [],
//     prerequisites: [''],
//     inclusions: [''],
//     exclusions: [''],
//     thingsToCarry: [''],
//     safetyGuidelines: ['']
//   });

//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [currentStep, setCurrentStep] = useState(1);

//   const categories = [
//     'Adventure Parks', 'Adventure', 'Water Sports', 'Air Sports',
//     'Team Sports', 'Individual Sports', 'Fitness', 'Other'
//   ];

//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   // Load activity data if editing
//   useEffect(() => {
//     if (activity) {
//       setFormData({
//         title: activity.title || '',
//         description: activity.description || '',
//         category: activity.category || 'Adventure Parks',
//         venue: activity.venue || '',
//         address: activity.address || '',
//         city: activity.city || '',
//         state: activity.state || '',
//         pincode: activity.pincode || '',
//         latitude: activity.locationCoordinates?.latitude || '',
//         longitude: activity.locationCoordinates?.longitude || '',
//         startDate: activity.startDate ? new Date(activity.startDate).toISOString().split('T')[0] : '',
//         endDate: activity.endDate ? new Date(activity.endDate).toISOString().split('T')[0] : '',
//         duration: activity.duration || '',
//         price: activity.price || '',
//         priceUnit: activity.priceUnit || 'per person',
//         discountPercentage: activity.discountPercentage || '0',
//         maxParticipants: activity.maxParticipants || '',
//         maxParticipantsPerSlot: activity.maxParticipantsPerSlot || '',
//         minAge: activity.minAge || '',
//         maxAge: activity.maxAge || '',
//         videoUrl: activity.videoUrl || '',
//         organizerName: activity.organizer?.name || '',
//         organizerContact: activity.organizer?.contactNumber || '',
//         organizerEmail: activity.organizer?.email || '',
//         status: activity.status || 'Draft',
//         cancellationPolicy: activity.cancellationPolicy || '',
//         termsAndConditions: activity.termsAndConditions || '',
//         safetyRules: activity.safetyRules || 'Please follow all safety instructions provided by our trained staff.'
//       });

//       setArrayFields({
//         availableDays: activity.availableDays || [],
//         timeSlots: activity.timeSlots || [],
//         prerequisites: activity.prerequisites?.length > 0 ? activity.prerequisites : [''],
//         inclusions: activity.inclusions?.length > 0 ? activity.inclusions : [''],
//         exclusions: activity.exclusions?.length > 0 ? activity.exclusions : [''],
//         thingsToCarry: activity.thingsToCarry?.length > 0 ? activity.thingsToCarry : [''],
//         safetyGuidelines: activity.safetyGuidelines?.length > 0 ? activity.safetyGuidelines : ['']
//       });

//       if (activity.images?.length > 0) {
//         setImagePreviews(activity.images);
//       }
//     }
//   }, [activity]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDayToggle = (day) => {
//     setArrayFields(prev => ({
//       ...prev,
//       availableDays: prev.availableDays.includes(day)
//         ? prev.availableDays.filter(d => d !== day)
//         : [...prev.availableDays, day]
//     }));
//   };

//   const addTimeSlot = () => {
//     setArrayFields(prev => ({
//       ...prev,
//       timeSlots: [...prev.timeSlots, { startTime: '', endTime: '', availableSpots: '' }]
//     }));
//   };

//   const updateTimeSlot = (index, field, value) => {
//     setArrayFields(prev => ({
//       ...prev,
//       timeSlots: prev.timeSlots.map((slot, i) =>
//         i === index ? { ...slot, [field]: value } : slot
//       )
//     }));
//   };

//   const removeTimeSlot = (index) => {
//     setArrayFields(prev => ({
//       ...prev,
//       timeSlots: prev.timeSlots.filter((_, i) => i !== index)
//     }));
//   };

//   const addArrayItem = (field) => {
//     setArrayFields(prev => ({
//       ...prev,
//       [field]: [...prev[field], '']
//     }));
//   };

//   const updateArrayItem = (field, index, value) => {
//     setArrayFields(prev => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => (i === index ? value : item))
//     }));
//   };

//   const removeArrayItem = (field, index) => {
//     setArrayFields(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + images.length > 10) {
//       setError('Maximum 10 images allowed');
//       return;
//     }

//     setImages(prev => [...prev, ...files]);

//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreviews(prev => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateStep = (step) => {
//     switch (step) {
//       case 1:
//         return formData.title && formData.description && formData.category;
//       case 2:
//         return formData.venue && formData.address && formData.city && formData.state && formData.pincode.match(/^[0-9]{6}$/);
//       case 3:
//         return formData.startDate && formData.endDate && formData.duration && arrayFields.availableDays.length > 0 && arrayFields.timeSlots.length > 0;
//       case 4:
//         return formData.price && formData.maxParticipants;
//       default:
//         return true;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const submitData = new FormData();

//       Object.keys(formData).forEach(key => {
//         if (formData[key]) {
//           submitData.append(key, formData[key]);
//         }
//       });

//       submitData.append('availableDays', JSON.stringify(arrayFields.availableDays));
//       submitData.append('timeSlots', JSON.stringify(arrayFields.timeSlots));
//       submitData.append('prerequisites', JSON.stringify(arrayFields.prerequisites.filter(item => item.trim())));
//       submitData.append('inclusions', JSON.stringify(arrayFields.inclusions.filter(item => item.trim())));
//       submitData.append('exclusions', JSON.stringify(arrayFields.exclusions.filter(item => item.trim())));
//       submitData.append('thingsToCarry', JSON.stringify(arrayFields.thingsToCarry.filter(item => item.trim())));
//       submitData.append('safetyGuidelines', JSON.stringify(arrayFields.safetyGuidelines.filter(item => item.trim())));

//       images.forEach(image => {
//         submitData.append('images', image);
//       });

//       if (activity) {
//         await activityService.updateActivity(activity._id, submitData);
//       } else {
//         await activityService.createActivity(submitData);
//       }

//       onSuccess();
//     } catch (error) {
//       setError(error.response?.data?.message || 'Operation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => prev + 1);
//     } else {
//       setError('Please fill all required fields');
//     }
//   };

//   const prevStep = () => setCurrentStep(prev => prev - 1);

  

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold">
//                 {activity ? 'Edit Activity' : 'Create New Activity'}
//               </h2>
//               <p className="text-blue-100 text-sm mt-1">Step {currentStep} of 5</p>
//             </div>
//             <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
//             <div className="bg-white rounded-full h-2 transition-all duration-300" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
//           {/* STEP 1: Basic Information */}
//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">📝 Basic Information</h3>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Activity Title <span className="text-red-500">*</span>
//                 </label>
//                 <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required maxLength={200} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required maxLength={2000} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
//                   {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
//                   <option value="Draft">Draft</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* STEP 2: Location Details */}
//           {currentStep === 2 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Location Details</h3>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Venue Name <span className="text-red-500">*</span>
//                 </label>
//                 <input type="text" name="venue" value={formData.venue} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Address <span className="text-red-500">*</span>
//                 </label>
//                 <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     State <span className="text-red-500">*</span>
//                   </label>
//                   <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Pincode <span className="text-red-500">*</span>
//                   </label>
//                   <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} pattern="[0-9]{6}" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
//                   <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
//                   <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 3: Schedule & Time */}
//           {currentStep === 3 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Schedule & Timing</h3>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Start Date <span className="text-red-500">*</span>
//                   </label>
//                   <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     End Date <span className="text-red-500">*</span>
//                   </label>
//                   <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Duration (minutes) <span className="text-red-500">*</span>
//                 </label>
//                 <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Available Days <span className="text-red-500">*</span>
//                 </label>
//                 <div className="grid grid-cols-4 gap-2">
//                   {daysOfWeek.map(day => (
//                     <button key={day} type="button" onClick={() => handleDayToggle(day)} className={`px-4 py-2 rounded-lg border transition-colors ${arrayFields.availableDays.includes(day) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}>
//                       {day.slice(0, 3)}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Time Slots <span className="text-red-500">*</span>
//                 </label>
//                 {arrayFields.timeSlots.map((slot, index) => (
//                   <div key={index} className="flex items-center space-x-2 mb-2">
//                     <input type="text" placeholder="09:00 AM" value={slot.startTime} onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                     <input type="text" placeholder="10:00 AM" value={slot.endTime} onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                     <input type="number" placeholder="Spots" value={slot.availableSpots} onChange={(e) => updateTimeSlot(index, 'availableSpots', e.target.value)} className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                     <button type="button" onClick={() => removeTimeSlot(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//                 <button type="button" onClick={addTimeSlot} className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
//                   + Add Time Slot
//                 </button>
//               </div>
//             </div>
//           )}



//           {/* STEP 4: Pricing & Participants */}
//           {currentStep === 4 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Pricing & Participants</h3>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price (₹) <span className="text-red-500">*</span>
//                   </label>
//                   <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Price Unit</label>
//                   <select name="priceUnit" value={formData.priceUnit} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
//                     <option value="per person">Per Person</option>
//                     <option value="per slot">Per Slot</option>
//                     <option value="per group">Per Group</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
//                 <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} min="0" max="100" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Max Participants <span className="text-red-500">*</span>
//                   </label>
//                   <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Max Per Slot</label>
//                   <input type="number" name="maxParticipantsPerSlot" value={formData.maxParticipantsPerSlot} onChange={handleChange} min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Min Age</label>
//                   <input type="number" name="minAge" value={formData.minAge} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Max Age</label>
//                   <input type="number" name="maxAge" value={formData.maxAge} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>
//               </div>

//               {/* Array Fields */}
//               {['prerequisites', 'inclusions', 'exclusions', 'thingsToCarry', 'safetyGuidelines'].map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
//                     {field.replace(/([A-Z])/g, ' $1').trim()}
//                   </label>
//                   {arrayFields[field].map((item, index) => (
//                     <div key={index} className="flex items-center space-x-2 mb-2">
//                       <input
//                         type="text"
//                         value={item}
//                         onChange={(e) => updateArrayItem(field, index, e.target.value)}
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem(field, index)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayItem(field)}
//                     className="mt-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
//                   >
//                     + Add {field.replace(/([A-Z])/g, ' $1').trim()}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* STEP 5: Media & Organizer */}
//           {currentStep === 5 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">📸 Media & Organizer Details</h3>

//               {/* Images */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Activity Images (Max 10)
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">First image will be used as thumbnail</p>

//                 {imagePreviews.length > 0 && (
//                   <div className="grid grid-cols-4 gap-3 mt-4">
//                     {imagePreviews.map((preview, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={preview}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                         {index === 0 && (
//                           <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
//                             Thumbnail
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
//                 <input
//                   type="url"
//                   name="videoUrl"
//                   value={formData.videoUrl}
//                   onChange={handleChange}
//                   placeholder="https://youtube.com/..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="border-t pt-6">
//                 <h4 className="font-semibold text-gray-800 mb-4">Organizer Information</h4>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Organizer Name</label>
//                   <input
//                     type="text"
//                     name="organizerName"
//                     value={formData.organizerName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
//                     <input
//                       type="tel"
//                       name="organizerContact"
//                       value={formData.organizerContact}
//                       onChange={handleChange}
//                       pattern="[0-9]{10}"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                     <input
//                       type="email"
//                       name="organizerEmail"
//                       value={formData.organizerEmail}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t pt-6">
//                 <h4 className="font-semibold text-gray-800 mb-4">Policies</h4>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
//                   <textarea
//                     name="cancellationPolicy"
//                     value={formData.cancellationPolicy}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
//                   <textarea
//                     name="termsAndConditions"
//                     value={formData.termsAndConditions}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Safety Rules</label>
//                   <textarea
//                     name="safetyRules"
//                     value={formData.safetyRules}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </form>

//         {/* Footer Navigation */}
//         <div className="px-8 py-6 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex items-center justify-between">
//           <button
//             type="button"
//             onClick={prevStep}
//             disabled={currentStep === 1}
//             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             ← Previous
//           </button>

//           <div className="flex items-center space-x-2">
//             {[1, 2, 3, 4, 5].map((step) => (
//               <div
//                 key={step}
//                 className={`w-2 h-2 rounded-full transition-colors ${
//                   step === currentStep
//                     ? 'bg-blue-600 w-8'
//                     : step < currentStep
//                     ? 'bg-green-500'
//                     : 'bg-gray-300'
//                 }`}
//               />
//             ))}
//           </div>

//           {currentStep < 5 ? (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Next →
//             </button>
//           ) : (
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               disabled={loading}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   <span>Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>{activity ? 'Update Activity' : 'Create Activity'}</span>
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivityForm;






















































//added validation

import { useState, useEffect } from 'react';
import activityService from '../../services/activityService';

const ActivityForm = ({ activity, onClose, onSuccess, setError }) => {
  const [loading, setLoading] = useState(false);
  // ** ADDED: State to hold field-specific validation errors **
  const [validationErrors, setValidationErrors] = useState({});
  // *********************************************************
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Adventure Parks',
    venue: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    latitude: '',
    longitude: '',
    startDate: '',
    endDate: '',
    duration: '',
    price: '',
    priceUnit: 'per person',
    discountPercentage: '0',
    maxParticipants: '',
    maxParticipantsPerSlot: '',
    minAge: '',
    maxAge: '',
    videoUrl: '',
    organizerName: '',
    organizerContact: '',
    organizerEmail: '',
    status: 'Draft',
    cancellationPolicy: '',
    termsAndConditions: '',
    safetyRules: 'Please follow all safety instructions provided by our trained staff.'
  });

  const [arrayFields, setArrayFields] = useState({
    availableDays: [],
    timeSlots: [],
    prerequisites: [''],
    inclusions: [''],
    exclusions: [''],
    thingsToCarry: [''],
    safetyGuidelines: ['']
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    'Adventure Parks', 'Adventure', 'Water Sports', 'Air Sports',
    'Team Sports', 'Individual Sports', 'Fitness', 'Other'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Load activity data if editing
  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title || '',
        description: activity.description || '',
        category: activity.category || 'Adventure Parks',
        venue: activity.venue || '',
        address: activity.address || '',
        city: activity.city || '',
        state: activity.state || '',
        pincode: activity.pincode || '',
        latitude: activity.locationCoordinates?.latitude || '',
        longitude: activity.locationCoordinates?.longitude || '',
        startDate: activity.startDate ? new Date(activity.startDate).toISOString().split('T')[0] : '',
        endDate: activity.endDate ? new Date(activity.endDate).toISOString().split('T')[0] : '',
        duration: activity.duration || '',
        price: activity.price || '',
        priceUnit: activity.priceUnit || 'per person',
        discountPercentage: activity.discountPercentage || '0',
        maxParticipants: activity.maxParticipants || '',
        maxParticipantsPerSlot: activity.maxParticipantsPerSlot || '',
        minAge: activity.minAge || '',
        maxAge: activity.maxAge || '',
        videoUrl: activity.videoUrl || '',
        organizerName: activity.organizer?.name || '',
        organizerContact: activity.organizer?.contactNumber || '',
        organizerEmail: activity.organizer?.email || '',
        status: activity.status || 'Draft',
        cancellationPolicy: activity.cancellationPolicy || '',
        termsAndConditions: activity.termsAndConditions || '',
        safetyRules: activity.safetyRules || 'Please follow all safety instructions provided by our trained staff.'
      });

      setArrayFields({
        availableDays: activity.availableDays || [],
        timeSlots: activity.timeSlots || [],
        prerequisites: activity.prerequisites?.length > 0 ? activity.prerequisites : [''],
        inclusions: activity.inclusions?.length > 0 ? activity.inclusions : [''],
        exclusions: activity.exclusions?.length > 0 ? activity.exclusions : [''],
        thingsToCarry: activity.thingsToCarry?.length > 0 ? activity.thingsToCarry : [''],
        safetyGuidelines: activity.safetyGuidelines?.length > 0 ? activity.safetyGuidelines : ['']
      });

      if (activity.images?.length > 0) {
        setImagePreviews(activity.images);
      }
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setArrayFields(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const addTimeSlot = () => {
    setArrayFields(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { startTime: '', endTime: '', availableSpots: '' }]
    }));
  };

  const updateTimeSlot = (index, field, value) => {
    setArrayFields(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const removeTimeSlot = (index) => {
    setArrayFields(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index)
    }));
  };

  const addArrayItem = (field) => {
    setArrayFields(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setArrayFields(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const removeArrayItem = (field, index) => {
    setArrayFields(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    setImages(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // ** MODIFIED: validateStep to capture specific errors **
  const validateStep = (step) => {
    const errors = {};
    let isValid = true;
    
    // Clear previous field errors before running validation for the current step
    setValidationErrors({});

    switch (step) {
      case 1:
        if (!formData.title) {
          errors.title = 'Activity Title is required.';
          isValid = false;
        }
        if (!formData.description) {
          errors.description = 'Description is required.';
          isValid = false;
        }
        if (!formData.category) {
          errors.category = 'Category is required.';
          isValid = false;
        }
        break;
      case 2:
        if (!formData.venue) {
          errors.venue = 'Venue Name is required.';
          isValid = false;
        }
        if (!formData.address) {
          errors.address = 'Full Address is required.';
          isValid = false;
        }
        if (!formData.city) {
          errors.city = 'City is required.';
          isValid = false;
        }
        if (!formData.state) {
          errors.state = 'State is required.';
          isValid = false;
        }
        // Pincode validation (Must be 6 digits)
        if (!formData.pincode || !formData.pincode.match(/^[0-9]{6}$/)) {
          errors.pincode = 'Pincode must be exactly 6 digits.';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.startDate) {
          errors.startDate = 'Start Date is required.';
          isValid = false;
        }
        if (!formData.endDate) {
          errors.endDate = 'End Date is required.';
          isValid = false;
        }
        // Duration validation (required and positive)
        if (!formData.duration || parseInt(formData.duration) < 1) {
          errors.duration = 'Duration is required and must be a positive number (in minutes).';
          isValid = false;
        }
        // Available Days validation
        if (arrayFields.availableDays.length === 0) {
          errors.availableDays = 'Select at least one available day.';
          isValid = false;
        }
        // Time Slots validation
        if (arrayFields.timeSlots.length === 0) {
          errors.timeSlots = 'Add at least one time slot.';
          isValid = false;
        } else {
            // Check for empty fields inside time slots
            const hasEmptySlot = arrayFields.timeSlots.some(slot => 
                !slot.startTime || !slot.endTime || !slot.availableSpots || parseInt(slot.availableSpots) < 1
            );
            if(hasEmptySlot) {
                errors.timeSlots = 'All time slots must have start time, end time, and available spots (>0).';
                isValid = false;
            }
        }
        break;
      case 4:
        // Price validation (required and greater than 0)
        if (!formData.price || parseFloat(formData.price) <= 0) {
          errors.price = 'Price is required and must be greater than 0.';
          isValid = false;
        }
        // Max Participants validation (required and at least 1)
        if (!formData.maxParticipants || parseInt(formData.maxParticipants) < 1) {
          errors.maxParticipants = 'Max Participants is required and must be at least 1.';
          isValid = false;
        }
        break;
      case 5:
        // Organizer Contact validation (10 digits if provided)
        if (formData.organizerContact && !formData.organizerContact.match(/^[0-9]{10}$/)) {
          errors.organizerContact = 'Contact Number must be a 10-digit number.';
          isValid = false;
        }
        break;
      default:
        isValid = true;
    }
    
    if (!isValid) {
        setValidationErrors(errors);
    }
    return isValid;
  };
  // *********************************************************

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // ** ADDED: Clear field errors before final submit **
    setValidationErrors({});
    // *************************************************

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      submitData.append('availableDays', JSON.stringify(arrayFields.availableDays));
      submitData.append('timeSlots', JSON.stringify(arrayFields.timeSlots));
      submitData.append('prerequisites', JSON.stringify(arrayFields.prerequisites.filter(item => item.trim())));
      submitData.append('inclusions', JSON.stringify(arrayFields.inclusions.filter(item => item.trim())));
      submitData.append('exclusions', JSON.stringify(arrayFields.exclusions.filter(item => item.trim())));
      submitData.append('thingsToCarry', JSON.stringify(arrayFields.thingsToCarry.filter(item => item.trim())));
      submitData.append('safetyGuidelines', JSON.stringify(arrayFields.safetyGuidelines.filter(item => item.trim())));

      images.forEach(image => {
        submitData.append('images', image);
      });

      if (activity) {
        await activityService.updateActivity(activity._id, submitData);
      } else {
        await activityService.createActivity(submitData);
      }

      onSuccess();
    } catch (error) {
      // ** MODIFIED: Catch block to handle backend validation errors **
      if (error.response?.data?.errors) {
        const fieldErrors = {};
        const apiErrors = error.response.data.errors;
        for (const key in apiErrors) {
             // Assuming API returns errors like { title: ["Title is mandatory"] }
            fieldErrors[key] = Array.isArray(apiErrors[key]) ? apiErrors[key].join(', ') : apiErrors[key];
        }
        setValidationErrors(fieldErrors);
        setError('Please correct the validation errors in the form.'); // Global message for validation
      } else {
        setError(error.response?.data?.message || 'Operation failed');
      }
      // ****************************************************************
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setError(''); // Clear global error on successful step validation
      setCurrentStep(prev => prev + 1);
    } else {
      setError('Please fix the highlighted errors before proceeding.'); // Updated global error message
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {activity ? 'Edit Activity' : 'Create New Activity'}
              </h2>
              <p className="text-blue-100 text-sm mt-1">Step {currentStep} of 5</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white rounded-full h-2 transition-all duration-300" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📝 Basic Information</h3>

              {/* Title Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                  required 
                  maxLength={200} 
                />
                {validationErrors.title && <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>}
              </div>

              {/* Description Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={4} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                  required 
                  maxLength={2000} 
                />
                {validationErrors.description && <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>}
              </div>

              {/* Category Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {validationErrors.category && <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>}
              </div>

              {/* Status Field (no validation changes) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Location Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Location Details</h3>

              {/* Venue Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="venue" 
                  value={formData.venue} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.venue ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                  required 
                />
                {validationErrors.venue && <p className="mt-1 text-sm text-red-600">{validationErrors.venue}</p>}
              </div>

              {/* Address Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  rows={3} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                  required 
                />
                {validationErrors.address && <p className="mt-1 text-sm text-red-600">{validationErrors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* City Field with Validation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    required 
                  />
                  {validationErrors.city && <p className="mt-1 text-sm text-red-600">{validationErrors.city}</p>}
                </div>

                {/* State Field with Validation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    required 
                  />
                  {validationErrors.state && <p className="mt-1 text-sm text-red-600">{validationErrors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Pincode Field with Validation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="pincode" 
                    value={formData.pincode} 
                    onChange={handleChange} 
                    pattern="[0-9]{6}" 
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.pincode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    required 
                  />
                  {validationErrors.pincode && <p className="mt-1 text-sm text-red-600">{validationErrors.pincode}</p>}
                </div>

                {/* Latitude/Longitude (no validation changes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Schedule & Time */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Schedule & Timing</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Date Field with Validation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.startDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    required 
                  />
                  {validationErrors.startDate && <p className="mt-1 text-sm text-red-600">{validationErrors.startDate}</p>}
                </div>

                {/* End Date Field with Validation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.endDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    required 
                  />
                  {validationErrors.endDate && <p className="mt-1 text-sm text-red-600">{validationErrors.endDate}</p>}
                </div>
              </div>

              {/* Duration Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleChange} 
                  min="1" 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.duration ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                  required 
                />
                {validationErrors.duration && <p className="mt-1 text-sm text-red-600">{validationErrors.duration}</p>}
              </div>

              {/* Available Days Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Days <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {daysOfWeek.map(day => (
                    <button key={day} type="button" onClick={() => handleDayToggle(day)} className={`px-4 py-2 rounded-lg border transition-colors ${arrayFields.availableDays.includes(day) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}>
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
                {validationErrors.availableDays && <p className="mt-1 text-sm text-red-600">{validationErrors.availableDays}</p>}
              </div>

              {/* Time Slots Field with Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Slots <span className="text-red-500">*</span>
                </label>
                {arrayFields.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input type="text" placeholder="09:00 AM" value={slot.startTime} onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="10:00 AM" value={slot.endTime} onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Spots" value={slot.availableSpots} onChange={(e) => updateTimeSlot(index, 'availableSpots', e.target.value)} className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <button type="button" onClick={() => removeTimeSlot(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addTimeSlot} className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  + Add Time Slot
                </button>
                {/* Time Slots general error */}
                {validationErrors.timeSlots && <p className="mt-1 text-sm text-red-600">{validationErrors.timeSlots}</p>}
              </div>
            </div>
          )}



          {/* STEP 4: Pricing & Participants */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Pricing & Participants</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Price Field with Validation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    min="0" 
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    required 
                  />
                  {validationErrors.price && <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>}
                </div>

                {/* Price Unit Field (no validation changes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Unit</label>
                  <select name="priceUnit" value={formData.priceUnit} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="per person">Per Person</option>
                    <option value="per slot">Per Slot</option>
                    <option value="per group">Per Group</option>
                  </select>
                </div>
              </div>

              {/* Discount Field (no validation changes) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} min="0" max="100" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Max Participants Field with Validation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Participants <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    name="maxParticipants" 
                    value={formData.maxParticipants} 
                    onChange={handleChange} 
                    min="1" 
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.maxParticipants ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    required 
                  />
                  {validationErrors.maxParticipants && <p className="mt-1 text-sm text-red-600">{validationErrors.maxParticipants}</p>}
                </div>

                {/* Max Per Slot (no validation changes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Per Slot</label>
                  <input type="number" name="maxParticipantsPerSlot" value={formData.maxParticipantsPerSlot} onChange={handleChange} min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Min/Max Age (no validation changes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Age</label>
                  <input type="number" name="minAge" value={formData.minAge} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Age</label>
                  <input type="number" name="maxAge" value={formData.maxAge} onChange={handleChange} min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Array Fields (no validation changes) */}
              {['prerequisites', 'inclusions', 'exclusions', 'thingsToCarry', 'safetyGuidelines'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {arrayFields[field].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem(field, index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(field, index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem(field)}
                    className="mt-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                  >
                    + Add {field.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: Media & Organizer */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📸 Media & Organizer Details</h3>

              {/* Images (no validation changes) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Images (Max 10)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">First image will be used as thumbnail</p>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                            Thumbnail
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video URL (no validation changes) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Organizer Information</h4>
                
                {/* Organizer Name (no validation changes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organizer Name</label>
                  <input
                    type="text"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {/* Contact Number Field with Validation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <input
                      type="tel"
                      name="organizerContact"
                      value={formData.organizerContact}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${validationErrors.organizerContact ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    {/* The user specifically mentioned 11 digits error, so we show a clear message here */}
                    {validationErrors.organizerContact && <p className="mt-1 text-sm text-red-600">{validationErrors.organizerContact}</p>}
                  </div>

                  {/* Email Field (no validation changes) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="organizerEmail"
                      value={formData.organizerEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Policies (no validation changes) */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Policies</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
                  <textarea
                    name="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
                  <textarea
                    name="termsAndConditions"
                    value={formData.termsAndConditions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Safety Rules</label>
                  <textarea
                    name="safetyRules"
                    value={formData.safetyRules}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer Navigation */}
        <div className="px-8 py-6 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step === currentStep
                    ? 'bg-blue-600 w-8'
                    : step < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{activity ? 'Update Activity' : 'Create Activity'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityForm;