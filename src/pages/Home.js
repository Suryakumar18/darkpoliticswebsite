"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Zoom,
  CircularProgress,
  Alert,
} from "@mui/material"
import { Email, LinkedIn, Twitter, HowToVote, Gavel, AccountBalance, Campaign } from "@mui/icons-material"
import Navbar from "../components/navar"
import About from "./About"
import Services from "./Service"
import Career from "./Career"
import Contact from "./Contact"
import OurImpact from "./Ourimpact"
import ContactSystem from "../components/ContactPopup"
import ContactPopup from "../components/ContactPopup"

const Home = () => {
  const [loaded, setLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))
  const isMobileLandscape = useMediaQuery("(max-height: 500px) and (orientation: landscape)")

  // Fetch homepage data from API
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/homepage')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Handle both single object and array responses
        const homePageData = data.success ? data.data : (Array.isArray(data) ? data[0] : data)
        
        if (!homePageData) {
          throw new Error('No homepage data found')
        }
        
        setHomeData(homePageData)
        setLoaded(true)
        setError(null)
      } catch (err) {
        console.error('Error fetching homepage data:', err)
        setError(err.message || 'Failed to load homepage data')
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  // Image rotation effect
  useEffect(() => {
    if (!homeData || !homeData.backgroundImages || homeData.backgroundImages.length === 0) {
      return
    }

    const activeImages = homeData.backgroundImages.filter(img => img.active)
    if (activeImages.length === 0) return

    // Auto-rotate only if enabled, otherwise just show first image
    if (homeData.displaySettings?.autoRotateImages) {
      const rotationInterval = (homeData.displaySettings?.imageRotationInterval || 5) * 1000
      
      const imageRotationInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activeImages.length)
      }, rotationInterval)

      return () => clearInterval(imageRotationInterval)
    }
  }, [homeData])

  // Loading state
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          backgroundColor: '#0f172a'
        }}
      >
        <CircularProgress sx={{ color: '#64b5f6' }} />
      </Box>
    )
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#0f172a', p: 3 }}>
        <Navbar />
        <Container>
          <Alert 
            severity="error" 
            sx={{ 
              mt: 4,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: 'white',
              '& .MuiAlert-icon': {
                color: '#f44336'
              }
            }}
          >
            Error loading homepage data: {error}
          </Alert>
        </Container>
      </Box>
    )
  }

  // No data state
  if (!homeData) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#0f172a', p: 3 }}>
        <Navbar />
        <Container>
          <Alert 
            severity="warning"
            sx={{ 
              mt: 4,
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              color: 'white',
              '& .MuiAlert-icon': {
                color: '#ff9800'
              }
            }}
          >
            No homepage data available
          </Alert>
        </Container>
      </Box>
    )
  }

  // Maintenance mode check
  if (homeData.displaySettings?.maintenanceMode) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#0f172a', p: 3 }}>
        <Navbar />
        <Container>
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
              Under Maintenance
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
              We're currently updating our site. Please check back soon.
            </Typography>
          </Box>
        </Container>
      </Box>
    )
  }

  const defaultBgUrl =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2074&q=80"
  
  // Get active images or use default
  const activeImages = homeData.backgroundImages?.filter(img => img.active) || []
  const images = activeImages.length > 0 ? activeImages : [{ url: defaultBgUrl, alt: "Background" }]
  const animationDuration = homeData.displaySettings?.animationDuration || 2

  return (
    <>
      <Navbar />
      <Box 
        id="home"
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Images */}
        {images.map((image, index) => {
          // Use the image URL directly (no need for encodeURI as these are already encoded URLs)
          const imageUrl = image.url || defaultBgUrl
          
          return (
            <Box
              key={image._id || `bg-${index}`}
              component="img"
              src={imageUrl}
              alt={image.alt || "Background image"}
              loading="eager"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
                opacity: currentImageIndex === index ? 1 : 0,
                transition: `opacity ${animationDuration}s ease-in-out`,
                pointerEvents: "none",
                userSelect: "none",
                backgroundColor: "#0f172a",
              }}
              onError={(e) => {
                // Fallback to default image if the URL fails to load
                e.target.src = defaultBgUrl
              }}
            />
          )
        })}

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isMobile
              ? "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.85) 50%, rgba(51, 65, 85, 0.8) 100%)"
              : "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(51, 65, 85, 0.75) 100%)",
            zIndex: 2,
          }}
        />

        {/* Floating Background Effects */}
        {homeData.displaySettings?.enableFloatingAnimations && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3,
              "&::before": {
                content: '""',
                position: "absolute",
                top: isMobile ? "15%" : "20%",
                right: isMobile ? "5%" : "10%",
                width: isMobile ? "150px" : isTablet ? "200px" : "300px",
                height: isMobile ? "150px" : isTablet ? "200px" : "300px",
                background: "radial-gradient(circle, rgba(25, 118, 210, 0.15) 0%, transparent 70%)",
                borderRadius: "50%",
                animation: "float 6s ease-in-out infinite",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: isMobile ? "5%" : "10%",
                left: isMobile ? "2%" : "5%",
                width: isMobile ? "100px" : isTablet ? "150px" : "200px",
                height: isMobile ? "100px" : isTablet ? "150px" : "200px",
                background: "radial-gradient(circle, rgba(25, 118, 210, 0.12) 0%, transparent 70%)",
                borderRadius: "50%",
                animation: "float 8s ease-in-out infinite reverse",
              },
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px) scale(1)" },
                "50%": { transform: "translateY(-20px) scale(1.05)" },
              },
            }}
          />
        )}

        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Fade in={loaded} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: { xs: 2, md: 3 },
                position: "relative",
                zIndex: 10,
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  letterSpacing: isMobile ? "1px" : "2px",
                  background: "linear-gradient(45deg, #ffffff, #64b5f6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                }}
              >
                {homeData.brandName || "DARK STATE"}
              </Typography>
              
              <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 } }}>
                {homeData.socialLinks?.linkedin && (
                  <IconButton
                    component="a"
                    href={homeData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "#64b5f6",
                        transform: "scale(1.1)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <LinkedIn fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                )}
                
                {homeData.socialLinks?.twitter && (
                  <IconButton
                    component="a"
                    href={homeData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "#64b5f6",
                        transform: "scale(1.1)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <Twitter fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                )}
                
                {homeData.socialLinks?.email && (
                  <IconButton
                    component="a"
                    href={`mailto:${homeData.socialLinks.email}`}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "#64b5f6",
                        transform: "scale(1.1)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <Email fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Fade>

          <Box
            sx={{
              textAlign: "center",
              py: { xs: 4, sm: 6, md: 8, lg: 12 },
              px: { xs: 1, sm: 2 },
              position: "relative",
              zIndex: 10,
            }}
          >
            <Slide direction="down" in={loaded} timeout={800}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#64b5f6",
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  letterSpacing: { xs: "1px", sm: "2px", md: "3px" },
                  textTransform: "uppercase",
                  textShadow: "0 0 20px rgba(100, 181, 246, 0.5)",
                  animation: "glow 2s ease-in-out infinite alternate",
                  fontSize: isMobileLandscape ? "1.4rem" : { xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem" },
                  "@keyframes glow": {
                    "0%": { textShadow: "0 0 20px rgba(100, 181, 246, 0.5)" },
                    "100%": { textShadow: "0 0 30px rgba(100, 181, 246, 0.8)" },
                  },
                }}
              >
                {homeData.tagline || "DARK STATE POLITICAL CONSULTANCY"}
              </Typography>
            </Slide>

            <Slide direction="down" in={loaded} timeout={1200}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  background: "linear-gradient(45deg, #ffffff, #90caf9, #64b5f6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(255,255,255,0.2)",
                  filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.3))",
                  fontSize: isMobileLandscape ? "3rem" : { xs: "1.8rem", sm: "2.5rem", md: "3.5rem", lg: "4rem" },
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                }}
                dangerouslySetInnerHTML={{ 
                  __html: homeData.mainHeading?.replace(/\n/g, '<br />') || "Empowering Citizens<br /> Reshaping Nations" 
                }}
              />
            </Slide>

            <Slide direction="up" in={loaded} timeout={1400}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mb: { xs: 3, sm: 3.5, md: 4 },
                  maxWidth: { xs: "100%", sm: "600px", md: "700px" },
                  mx: "auto",
                  lineHeight: { xs: 1.4, sm: 1.5 },
                  fontWeight: 300,
                  textShadow: "0 1px 5px rgba(0,0,0,0.3)",
                  fontSize: isMobileLandscape ? "1.3rem" : { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
                  px: { xs: 1, sm: 2 },
                }}
              >
                {homeData.description || "Strategic political consulting that transforms visions into victories. We craft campaigns that resonate, strategies that win, and futures that inspire."}
              </Typography>
            </Slide>

            <Zoom in={loaded} timeout={1600}>
              <Box>
                <Button
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    px: { xs: 4, sm: 5, md: 6 },
                    py: { xs: 1.5, sm: 2 },
                    fontSize: isMobileLandscape ? "1.2rem" : { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                    boxShadow: "0 10px 30px rgba(25, 118, 210, 0.4)",
                    borderRadius: "35px",
                    textTransform: "none",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: isMobile ? "translateY(-2px) scale(1.02)" : "translateY(-4px) scale(1.05)",
                      boxShadow: "0 15px 40px rgba(25, 118, 210, 0.5)",
                      background: "linear-gradient(45deg, #1565c0, #1976d2)",
                    },
                  }}
                >
                  {homeData.ctaButton || "Start Your Campaign"}
                </Button>
              </Box>
            </Zoom>
          </Box>
        </Container>

        {/* Floating Icons - Only show if enabled */}
        {homeData.displaySettings?.enableFloatingAnimations && (
          <>
            <Box
              sx={{
                position: "absolute",
                top: { xs: "25%", md: "20%" },
                left: { xs: "5%", md: "10%" },
                zIndex: 4,
                animation: "floatIcon 6s ease-in-out infinite",
                display: { xs: "block", sm: "block" },
                "@keyframes floatIcon": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-15px) rotate(5deg)" },
                },
              }}
            >
              <HowToVote
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  color: "#64b5f6",
                  opacity: 0.7,
                  filter: "drop-shadow(0 0 10px rgba(100, 181, 246, 0.5))",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: { xs: "30%", md: "35%" },
                right: { xs: "5%", md: "8%" },
                zIndex: 4,
                animation: "floatIcon 8s ease-in-out infinite 2s",
                display: { xs: "block", sm: "block" },
              }}
            >
              <Gavel
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                  color: "#42a5f5",
                  opacity: 0.6,
                  filter: "drop-shadow(0 0 8px rgba(66, 165, 245, 0.4))",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "35%", md: "30%" },
                left: { xs: "8%", md: "15%" },
                zIndex: 4,
                animation: "floatIcon 7s ease-in-out infinite 4s",
                display: { xs: "block", sm: "block" },
              }}
            >
              <AccountBalance
                sx={{
                  fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.2rem" },
                  color: "#90caf9",
                  opacity: 0.8,
                  filter: "drop-shadow(0 0 12px rgba(144, 202, 249, 0.6))",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "25%", md: "20%" },
                right: { xs: "8%", md: "12%" },
                zIndex: 4,
                animation: "floatIcon 9s ease-in-out infinite 1s",
                display: { xs: "block", sm: "block" },
              }}
            >
              <Campaign
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.8rem" },
                  color: "#1976d2",
                  opacity: 0.7,
                  filter: "drop-shadow(0 0 10px rgba(25, 118, 210, 0.5))",
                }}
              />
            </Box>

            {/* Animated Lines */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "18%", md: "15%" },
                left: { xs: "3%", md: "8%" },
                width: { xs: "2px", md: "4px" },
                height: { xs: "30px", sm: "45px", md: "60px" },
                background: "linear-gradient(to bottom, transparent, #1976d2, transparent)",
                borderRadius: "2px",
                animation: "pulse 3s ease-in-out infinite",
                zIndex: 4,
                display: { xs: "none", sm: "block" },
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 0.4, transform: "scaleY(1)" },
                  "50%": { opacity: 0.9, transform: "scaleY(1.3)" },
                },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: { xs: "55%", md: "50%" },
                left: { xs: "2%", md: "5%" },
                width: { xs: "12px", sm: "16px", md: "20px" },
                height: { xs: "9px", sm: "12px", md: "15px" },
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                borderRadius: "2px",
                opacity: 0.6,
                animation: "ballotDrop 4s ease-in-out infinite",
                zIndex: 4,
                display: { xs: "none", sm: "block" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "-3px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "4px", sm: "6px", md: "8px" },
                  height: { xs: "2px", md: "3px" },
                  background: "#64b5f6",
                  borderRadius: "1px",
                },
                "@keyframes ballotDrop": {
                  "0%": { transform: "translateY(-10px)", opacity: 0.3 },
                  "50%": { transform: "translateY(0px)", opacity: 0.8 },
                  "100%": { transform: "translateY(-10px)", opacity: 0.3 },
                },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: { xs: "65%", md: "60%" },
                right: { xs: "10%", md: "15%" },
                width: { xs: "3px", sm: "4px", md: "6px" },
                height: { xs: "20px", sm: "30px", md: "40px" },
                background: "linear-gradient(to bottom, transparent, #42a5f5, transparent)",
                borderRadius: "3px",
                animation: "pulse 4s ease-in-out infinite 1s",
                zIndex: 4,
                display: { xs: "none", sm: "block" },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "30%", md: "25%" },
                left: { xs: "8%", md: "12%" },
                width: { xs: "2px", md: "3px" },
                height: { xs: "40px", sm: "60px", md: "80px" },
                background: "linear-gradient(to bottom, transparent, #64b5f6, transparent)",
                borderRadius: "2px",
                animation: "pulse 5s ease-in-out infinite 2s",
                zIndex: 4,
                display: { xs: "none", sm: "block" },
              }}
            />
          </>
        )}
      </Box>

      {/* Other Sections */}
      <div id="about-us">
        <About />
      </div>
      
      <div id="services">
        <Services />
      </div>

      <div id="career">
        <Career />
      </div>

      <div id="our-impact">
        <OurImpact />
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  )
}

export default Home