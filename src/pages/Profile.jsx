import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import ApiService from '../api'; 
import Header from '../Header'; 

const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
];

const genders = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

// Helper function to calculate age from date of birth
const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        level: '',
        date_of_birth: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const calculateAge = (dobString) => {
        if (!dobString) return '';
        const dob = new Date(dobString);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Check if user is authenticated first
                if (!ApiService.isAuthenticated()) {
                    console.error('User not authenticated');
                    navigate('/login'); // Redirect to login page
                    setLoading(false); // Ensure loading state is false
                    return; 
                }
                
                const response = await ApiService.getUserProfile();
                setProfile((prev) => ({
                    username: response?.username ?? prev.username ?? '',
                    email: response?.email ?? prev.email ?? '',
                    // If backend doesn't have dob, keep what user may have typed
                    date_of_birth: response?.date_of_birth ?? prev.date_of_birth ?? '',
                    // Derive age from dob if dob exists, else keep existing value
                    age: response?.date_of_birth ? calculateAge(response.date_of_birth) : (response?.age ?? prev.age ?? ''),
                    gender: response?.gender ?? prev.gender ?? '',
                    height: response?.height ?? prev.height ?? '',
                    weight: response?.weight ?? prev.weight ?? '',
                    // Map numeric levels to string for UI if needed
                    level: typeof response?.level === 'number'
                        ? (response.level === 1 ? 'beginner' : response.level === 2 ? 'intermediate' : response.level === 3 ? 'advanced' : prev.level ?? '')
                        : (response?.level ?? prev.level ?? ''),
                }));
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => {
            const newProfile = { ...prev, [name]: value };
            // If date_of_birth changes, recalculate age
            if (name === 'date_of_birth') {
                newProfile.age = calculateAge(value);
            }
            return newProfile;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const profileData = {
                age: profile.age,
                gender: profile.gender,
                height: profile.height,
                weight: profile.weight,
                level: profile.level,
                date_of_birth: profile.date_of_birth,
            };
            
            await ApiService.saveUserProfile(profileData);
            // TODO: Replace alert with a more user-friendly notification system
            alert('Profile saved successfully!'); 
        } catch (error) {
            console.error('Failed to save profile:', error);
            // TODO: Replace alert with a more user-friendly notification system
            alert('Failed to save profile. Please try again.'); 
        } finally {
            setSaving(false);
        }
    };

    const styles = {
        page: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            paddingTop: '80px', // make room for fixed header
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingBottom: '40px'
        },
        card: {
            width: '100%',
            maxWidth: 720,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: 24,
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
        },
        row: { display: 'flex', gap: 16, marginBottom: 16 },
        col: { flex: 1 },
        label: { display: 'block', marginBottom: 6, color: '#e0e7ff', fontSize: 14 },
        input: { width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)', color: '#fff' },
        select: { width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)', color: '#fff' },
        header: { marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
        title: { fontSize: 20, fontWeight: 700, color: '#fff' },
        saveBtn: { 
            background: saving ? '#666' : 'linear-gradient(45deg,#8b5cf6,#ec4899)', 
            color: '#fff', 
            padding: '10px 16px', 
            borderRadius: 8, 
            border: 'none', 
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1
        },
        loadingText: { textAlign: 'center', color: '#fff', padding: '40px' }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div style={styles.page}>
                    <div style={styles.loadingText}>Loading profile...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div style={styles.page}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.title}>User Profile</div>
                        <button 
                            style={styles.saveBtn} 
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.col}>
                            <label style={styles.label}>Username</label>
                            <input 
                                name="username" 
                                value={profile.username} 
                                readOnly
                                placeholder="Username"
                                style={{...styles.input, opacity: 0.7, cursor: 'not-allowed'}} 
                            />
                        </div>
                        <div style={styles.col}>
                            <label style={styles.label}>Email</label>
                            <input 
                                name="email" 
                                value={profile.email} 
                                readOnly
                                placeholder="Email"
                                style={{...styles.input, opacity: 0.7, cursor: 'not-allowed'}} 
                            />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={{...styles.col, maxWidth: 200}}>
                            <label style={styles.label}>Date of Birth</label>
                            <input 
                                type="date" 
                                name="date_of_birth" 
                                value={profile.date_of_birth} 
                                onChange={handleChange} 
                                style={styles.input} 
                            />
                        </div>
                        <div style={{...styles.col, maxWidth: 140}}>
                            <label style={styles.label}>Age</label>
                            <input 
                                type="number" 
                                name="age" 
                                value={profile.age}
                                readOnly // Age should be derived from date_of_birth
                                placeholder="Age" 
                                style={{...styles.input, opacity: 0.7, cursor: 'not-allowed'}}
                            />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.col}>
                            <label style={styles.label}>Gender</label>
                            <select name="gender" value={profile.gender} onChange={handleChange} style={styles.select}>
                                {genders.map((g) => (
                                    <option key={g.value} value={g.value}>{g.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.col}>
                            <label style={styles.label}>Level</label>
                            <select name="level" value={profile.level} onChange={handleChange} style={styles.select}>
                                <option value="">Select Level</option>
                                {levels.map((l) => (
                                    <option key={l.value} value={l.value}>{l.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.col}>
                            <label style={styles.label}>Height (cm)</label>
                            <input 
                                type="number" 
                                name="height" 
                                value={profile.height} 
                                onChange={handleChange} 
                                placeholder="e.g. 175" 
                                style={styles.input} 
                            />
                        </div>
                        <div style={styles.col}>
                            <label style={styles.label}>Weight (kg)</label>
                            <input 
                                type="number" 
                                name="weight" 
                                value={profile.weight} 
                                onChange={handleChange} 
                                placeholder="e.g. 72" 
                                style={styles.input} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;