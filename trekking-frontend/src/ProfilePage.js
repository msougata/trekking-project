import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { isAuthenticated, isLoading, userProfile } = useContext(AuthContext);
  const [error, setError] = useState('');

  // Handle profile image upload (demo only, doesn't actually upload)
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150?img=12');
  const [uploading, setUploading] = useState(false);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    console.log("File selected:", file.name, file.type);
    
    // Simple image validation
    if (!file.type.match('image.*')) {
      console.error("Invalid file type:", file.type);
      setError('Please select an image file');
      return;
    }
    
    setUploading(true);
    console.log("Upload started...");
    
    // Simulate upload delay
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      console.log("Image URL created:", imageUrl);
      setProfileImage(imageUrl);
      setUploading(false);
      console.log("Upload complete");
    }, 1500);
  };
  
  // If not authenticated, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="profile-container py-5">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="profile-card shadow">
            <Card.Body className="p-4">
              <Row>
                <Col md={4} className="text-center mb-4 mb-md-0">
                  <div className="profile-image-container">
                    {uploading ? (
                      <div className="profile-image-placeholder d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="light" />
                      </div>
                    ) : (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="profile-image"
                      />
                    )}
                    <div className="profile-image-overlay">
                      <label htmlFor="profile-upload" className="mb-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </label>
                      <input 
                        type="file" 
                        id="profile-upload" 
                        className="d-none" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </div>
                  </div>
                  
                  <h4 className="mt-3">{userProfile?.name || 'User'}</h4>
                  <p className="text-muted mb-md-0">Trekker</p>
                </Col>
                
                <Col md={8}>
                  <h3 className="border-bottom pb-2 mb-4">Account Information</h3>
                  
                  <div className="profile-info">
                    <Row className="mb-3">
                      <Col sm={4} className="profile-label">Email:</Col>
                      <Col sm={8} className="profile-value">{userProfile?.email || 'Not available'}</Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col sm={4} className="profile-label">Full Name:</Col>
                      <Col sm={8} className="profile-value">{userProfile?.name || 'Not available'}</Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col sm={4} className="profile-label">Joined:</Col>
                      <Col sm={8} className="profile-value">{userProfile?.joinDate || 'Recently'}</Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col sm={4} className="profile-label">Phone:</Col>
                      <Col sm={8} className="profile-value">{userProfile?.phone || '+91 98765 43210'}</Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;