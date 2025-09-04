"use client"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Menu,
  Close,
  LinkedIn,
  Phone,
  Home,
  Info,
  Business,
  Work,
  ContactMail,
  TrendingUp,
  Instagram,
  WhatsApp,
} from "@mui/icons-material"
import { X } from "@mui/icons-material" // Using X icon for Twitter/X

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    // Close mobile drawer if open
    setMobileOpen(false)
  }

  // Function to handle phone call
  const handlePhoneClick = () => {
    window.location.href = "tel:+918973051676"
  }

  // Function to handle WhatsApp
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/918973051676", "_blank", "noopener,noreferrer")
  }

  // Function to handle social media links
  const handleSocialClick = (platform) => {
    let url = ""
    switch (platform) {
      case "linkedin":
        url = "https://www.linkedin.com/company/darkstate-political-consultancy/"
        break
      case "instagram":
        url = "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=z6jfce4"
        break
      case "x":
        url = "https://x.com/Darkstatefirm?t=-OQmjrYxqQll5ydO1clTpA&s=09"
        break
      case "whatsapp":
        handleWhatsAppClick()
        return
      default:
        return
    }
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const navItems = [
    { label: "HOME", icon: <Home fontSize="small" />, id: "home" },
    { label: "ABOUT US", icon: <Info fontSize="small" />, id: "about-us" },
    { label: "SERVICES", icon: <Business fontSize="small" />, id: "services" },
    { label: "CAREER", icon: <Work fontSize="small" />, id: "career" },
    { label: "CONTACT", icon: <ContactMail fontSize="small" />, id: "contact" },
    { label: "OUR IMPACT", icon: <TrendingUp fontSize="small" />, id: "our-impact" },
  ]

  const drawer = (
    <Box
      sx={{
        width: 250,
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)",
        height: "100%",
        color: "white",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #ffffff, #64b5f6)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}
        >
          DARK STATE
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
            onClick={() => scrollToSection(item.id)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ color: "#64b5f6" }}>{item.icon}</Box>
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    "&:hover": {
                      color: "#64b5f6",
                      transition: "color 0.3s ease",
                    },
                  },
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 4 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#64b5f6",
            mb: 2,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Connect With Us
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <IconButton 
            size="small" 
            onClick={() => handleSocialClick("linkedin")}
            sx={{ color: "white", "&:hover": { color: "#0077b5" } }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => handleSocialClick("instagram")}
            sx={{ color: "white", "&:hover": { color: "#e4405f" } }}
          >
            <Instagram />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => handleSocialClick("x")}
            sx={{ color: "white", "&:hover": { color: "#1d9bf0" } }}
          >
            <X />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handleWhatsAppClick}
            sx={{ color: "white", "&:hover": { color: "#25d366" } }}
            title="WhatsApp +91 8973051676"
          >
            <WhatsApp />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handlePhoneClick}
            sx={{ color: "white", "&:hover": { color: "#4caf50" } }}
            title="Call +91 8973051676"
          >
            <Phone />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(100, 181, 246, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ffffff, #64b5f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: { xs: "1px", md: "2px" },
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
              animation: "logoGlow 3s ease-in-out infinite alternate",
              "@keyframes logoGlow": {
                "0%": { filter: "drop-shadow(0 0 5px rgba(100, 181, 246, 0.3))" },
                "100%": { filter: "drop-shadow(0 0 15px rgba(100, 181, 246, 0.6))" },
              },
            }}
          >
            DARK STATE
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    startIcon={item.icon}
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      color: "white",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      textTransform: "none",
                      position: "relative",
                      px: 1.5,
                      py: 0.5,
                      "& .MuiButton-startIcon": {
                        color: "#64b5f6",
                        marginRight: "6px",
                      },
                      "&:hover": {
                        color: "#64b5f6",
                        background: "transparent",
                        "& .MuiButton-startIcon": {
                          color: "#ffffff",
                        },
                        "&::after": {
                          width: "100%",
                        },
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        background: "linear-gradient(45deg, #64b5f6, #42a5f5)",
                        transition: "width 0.3s ease",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => handleSocialClick("linkedin")}
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "#0077b5",
                      transform: "scale(1.1)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleSocialClick("instagram")}
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "#e4405f",
                      transform: "scale(1.1)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleSocialClick("x")}
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "#1d9bf0",
                      transform: "scale(1.1)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <X fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleWhatsAppClick}
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "#25d366",
                      transform: "scale(1.1)",
                      transition: "all 0.3s ease",
                    },
                  }}
                  title="WhatsApp +91 8973051676"
                >
                  <WhatsApp fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handlePhoneClick}
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "#4caf50",
                      transform: "scale(1.1)",
                      transition: "all 0.3s ease",
                    },
                  }}
                  title="Call +91 8973051676"
                >
                  <Phone fontSize="small" />
                </IconButton>
              </Box>

              {/* Desktop Logo Image with Enhanced Animations */}
              <Box
                component="img"
                src="/nn-removebg-preview.png"
                alt="Dark State Logo"
                sx={{
                  ml: 2,
                  height: { xs: "40px", sm: "55px", md: "65px" },
                  width: "auto",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  animation: "logoEntrance 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, logoFloat 3s ease-in-out 1.2s infinite, logoPulse 2s ease-in-out 1.2s infinite alternate",
                  transformOrigin: "center center",
                  "&:hover": {
                    filter: "drop-shadow(0 8px 25px rgba(100, 181, 246, 0.6)) brightness(1.1)",
                    transform: "scale(1.15) translateY(-3px)",
                    animationPlayState: "paused",
                  },
                  // Initial state for entrance animation
                  opacity: 0,
                  transform: "scale(2.5) translateY(-20px)",
                  
                  // Keyframe animations
                  "@keyframes logoEntrance": {
                    "0%": { 
                      opacity: 0,
                      transform: "scale(2.5) translateY(-20px) rotate(-15deg)",
                      filter: "drop-shadow(0 0 20px rgba(100, 181, 246, 1)) blur(3px)"
                    },
                    "50%": {
                      opacity: 0.7,
                      transform: "scale(0.8) translateY(5px) rotate(5deg)",
                      filter: "drop-shadow(0 4px 15px rgba(100, 181, 246, 0.8)) blur(1px)"
                    },
                    "80%": {
                      opacity: 0.9,
                      transform: "scale(1.1) translateY(-2px) rotate(-2deg)",
                      filter: "drop-shadow(0 6px 20px rgba(100, 181, 246, 0.6)) blur(0px)"
                    },
                    "100%": { 
                      opacity: 1,
                      transform: "scale(1) translateY(0px) rotate(0deg)",
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))"
                    },
                  },
                  "@keyframes logoFloat": {
                    "0%, 100%": { 
                      transform: "translateY(0px) scale(1)",
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))"
                    },
                    "50%": { 
                      transform: "translateY(-8px) scale(1.02)",
                      filter: "drop-shadow(0 8px 15px rgba(100, 181, 246, 0.3))"
                    },
                  },
                  "@keyframes logoPulse": {
                    "0%": { 
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3)) brightness(1)"
                    },
                    "100%": { 
                      filter: "drop-shadow(0 4px 15px rgba(100, 181, 246, 0.4)) brightness(1.05)"
                    },
                  },
                }}
              />
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Mobile Logo Image with Enhanced Animations */}
              <Box
                component="img"
                src="/nn-removebg-preview.png"
                alt="Dark State Logo"
                sx={{
                  height: { xs: "35px", sm: "40px" },
                  width: "auto",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  animation: "logoEntranceMobile 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, logoFloatMobile 3s ease-in-out 1.2s infinite, logoPulseMobile 2s ease-in-out 1.2s infinite alternate",
                  transformOrigin: "center center",
                  "&:hover": {
                    filter: "drop-shadow(0 6px 20px rgba(100, 181, 246, 0.6)) brightness(1.1)",
                    transform: "scale(1.1) translateY(-2px)",
                    animationPlayState: "paused",
                  },
                  // Initial state for mobile entrance animation
                  opacity: 0,
                  transform: "scale(2.2) translateY(-15px)",
                  
                  "@keyframes logoEntranceMobile": {
                    "0%": { 
                      opacity: 0,
                      transform: "scale(2.2) translateY(-15px) rotate(-10deg)",
                      filter: "drop-shadow(0 0 15px rgba(100, 181, 246, 1)) blur(2px)"
                    },
                    "50%": {
                      opacity: 0.7,
                      transform: "scale(0.85) translateY(3px) rotate(3deg)",
                      filter: "drop-shadow(0 3px 12px rgba(100, 181, 246, 0.8)) blur(1px)"
                    },
                    "80%": {
                      opacity: 0.9,
                      transform: "scale(1.05) translateY(-1px) rotate(-1deg)",
                      filter: "drop-shadow(0 4px 15px rgba(100, 181, 246, 0.6)) blur(0px)"
                    },
                    "100%": { 
                      opacity: 1,
                      transform: "scale(1) translateY(0px) rotate(0deg)",
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))"
                    },
                  },
                  "@keyframes logoFloatMobile": {
                    "0%, 100%": { 
                      transform: "translateY(0px) scale(1)",
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))"
                    },
                    "50%": { 
                      transform: "translateY(-6px) scale(1.02)",
                      filter: "drop-shadow(0 6px 12px rgba(100, 181, 246, 0.3))"
                    },
                  },
                  "@keyframes logoPulseMobile": {
                    "0%": { 
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3)) brightness(1)"
                    },
                    "100%": { 
                      filter: "drop-shadow(0 3px 12px rgba(100, 181, 246, 0.4)) brightness(1.05)"
                    },
                  },
                }}
              />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "#64b5f6",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Menu />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar