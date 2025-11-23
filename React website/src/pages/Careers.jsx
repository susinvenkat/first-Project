import { useState } from 'react';
import api from '../services/api';

export default function Careers() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    location: '',
    cover_letter: '',
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      if (resume) {
        submitData.append('resume', resume);
      }

      const response = await api.submitApplication(submitData);
      if (response.success) {
        setMessage('Application submitted successfully!');
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          location: '',
          cover_letter: '',
        });
        setResume(null);
      }
    } catch (error) {
      setMessage('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl">Build your career with Susin Group</p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl text-primary mb-4"><i className="fas fa-globe"></i></div>
              <h3 className="text-xl font-bold mb-2">Global Opportunities</h3>
              <p className="text-gray-600">Work across India, UAE, and Qatar</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl text-primary mb-4"><i className="fas fa-chart-line"></i></div>
              <h3 className="text-xl font-bold mb-2">Career Growth</h3>
              <p className="text-gray-600">Professional development and training</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl text-primary mb-4"><i className="fas fa-users"></i></div>
              <h3 className="text-xl font-bold mb-2">Great Team</h3>
              <p className="text-gray-600">Collaborative and supportive environment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">Submit Your Application</h2>
          
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Position *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Position</option>
                  <option value="MEP Engineer">MEP Engineer</option>
                  <option value="HVAC Technician">HVAC Technician</option>
                  <option value="Electrical Engineer">Electrical Engineer</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Site Supervisor">Site Supervisor</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Experience (Years) *</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Preferred Location *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Location</option>
                  <option value="India">India</option>
                  <option value="UAE">UAE</option>
                  <option value="Qatar">Qatar</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
              <textarea
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell us why you'd be a great fit..."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Resume/CV *</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
