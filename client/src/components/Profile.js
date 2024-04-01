import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  FormErrorMessage,
  extendTheme,
  ChakraProvider,
  Link,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FaUserCircle,FaEdit } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useUserContext } from "../UserContext";


const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45CFDD",
  },
});
const Profile = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [fullnameError, setFullnameError] = useState(false);
  const [mobileNoError, setMobileNoError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fullname, setFullname] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [mobileNo, setMobileNo] = useState("1234567890");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [savedFullname, setSavedFullname] = useState("John Doe");
  const [savedEmail, setSavedEmail] = useState("john.doe@example.com");
  const [savedMobileNo, setSavedMobileNo] = useState("1234567890");
  const [savedProfileImage, setSavedProfileImage] = useState(null);
  const { userEmail}  = useUserContext();

 
  const [profileDetails, setProfileDetails] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
  });

  const fetchUserDetails = async (userEmail) => {
    try {
      const response = await axios.get(
        `https://staff-minder-backend.onrender.com/api/employees?email=${userEmail}`
      );
      const employees = response.data;
      const user = employees.find((emp) => emp.email === userEmail);
      if (user) {
        // Update profile details with user data
        setProfileDetails({
          fullName: user.name,
          email: user.email,
          mobileNo: user.phoneNumber,
          employeeId: user._id,
          team:user.team,
          role:user.role,
          d_o_b:user.dateOfBirth.substring(0, 10),
          d_o_j:user.dateOfJoining.substring(0, 10),
          savedProfileImage: user.picture,
        });
        
      } else {
        // Handle case where user is not found
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

 
  useEffect(() => {
    if (userEmail) {
      
      fetchUserDetails(userEmail);
    }
  }, [userEmail]);

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };
  const handleNameInputChange = (e) => {
    setFullname(e.target.value);
    setFullnameError(false);
  };
  const handleMobileInputChange = (e) => {
    setMobileNo(e.target.value);
    setMobileNoError(false);
  };
  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handling form submission...");
    // Name validation
    if (fullname.length < 5) {
      setFullnameError(true);
      return;
    }
    // Mobile number validation
    if (mobileNo.length !== 10 || !/^\d+$/.test(mobileNo)) {
      setMobileNoError(true);
      return;
    }
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    // Password validation using regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    }
    // console.log("Validation passed. Proceeding with form submission...");
    // Update saved profile details
    setSavedFullname(fullname);
    setSavedEmail(email);
    setSavedMobileNo(mobileNo);
    // No need to update profile image here
    setIsEditing(false);
    // console.log("isEditing after form submission:", isEditing);
  };
  const handleEditPicture = () => {
    // Trigger the hidden file input element to open the file picker dialog
    const fileInput = document.getElementById("image-upload");
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleLogout = () => {
    signOut(auth) // Call the signOut function with your auth object
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
        console.log("Logged out");
      })
      .catch((error) => {
        console.log("Logout error:", error);
        // Handle any errors that occur during the logout process
      });
  };
  return (
    <ChakraProvider theme={customTheme}>
      <Center bgGradient="linear(to-b, brandBlue, brandLightBlue)" minH="100vh">
        <Box
          w={["full", "md"]}
          p={[8, 10]}
          mt={[20, "10vh"]}
          mx="auto"
          border={["none", "1px"]}
          borderColor={["", "gray.300"]}
          borderRadius={10}
          h="90%"
        >
          <VStack spacing={6} align="center" h="100%">
            <VStack spacing={2} align="center" w="full" mb={20}>
              <Link>
                {isEditing ? (
                  <>
                  <img
                    src={previewImage || profileDetails.savedProfileImage}
                    alt = "profile preview"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      border: "none",
                    }}
                  />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageInputChange}
                  />
                  </>
                ) : (
                  <Box
                  as={savedProfileImage ? profileDetails.savedProfileImage : FaUserCircle}
                  src={savedProfileImage}
                  alt="profile"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    border: "none",
                  }}
                />
                 
                )}
               
                 {isEditing && (
      <IconButton
        icon={<FaEdit />}
        onClick={handleEditPicture}
        aria-label="Edit Picture"
      />
    )}
              </Link>
            </VStack>
            {isEditing ? (
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <FormControl isInvalid={fullnameError}>
                  <Input
                    value={profileDetails.fullName}
                    onChange={handleNameInputChange}
                    placeholder="Fullname"
                    bg="white"
                    mt={5}
                  />
                  {fullnameError && (
                    <FormErrorMessage fontSize="sm" color="red">
                      Name should have at least 5 characters
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={emailError}>
                  <Input
                    type="email"
                    value={profileDetails.email}
                    onChange={handleEmailInputChange}
                    placeholder="E-mail"
                    bg="white"
                    mt={5}
                  />
                  {emailError && (
                    <FormErrorMessage fontSize="sm" color="red">
                      Invalid email address
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={mobileNoError}>
                  <Input
                    type="tel"
                    value={profileDetails.mobileNo}
                    onChange={handleMobileInputChange}
                    placeholder="Contact"
                    bg="white"
                    mt={5}
                  />
                  {mobileNoError && (
                    <FormErrorMessage fontSize="sm" color="red">
                      Invalid mobile number (10 characters required)
                    </FormErrorMessage>
                  )}
                   <FormControl isInvalid={passwordError}>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordInputChange}
                  placeholder="Password"
                  bg="white"
                  mt={5}
                  pr={showPassword ? "2.5rem" : "1rem"}
                  // Add right padding to accommodate the toggle button
                />
                {passwordError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Invalid password
                  </FormErrorMessage>
                )}
              </FormControl>
                </FormControl>
                <Flex mt={5} align="center">
                  <Button type="submit" colorScheme="green">
                    Save
                  </Button>
                  <Button ml={3} onClick={handleCancel}>
                    Cancel
                  </Button>
                </Flex>
              </form>
            ) : (
              <>
                <Box textAlign="center" w="100%"  p={4} colorScheme="white" bg="white" boxShadow="md" borderRadius="md" >
                  <Box fontSize="xl" fontWeight="bold" mb={3}>
                    {profileDetails.fullName}
                    </Box>
                    <Box fontSize="s" fontWeight="bold">EMPLOYEE ID : {profileDetails.employeeId}</Box>
                 
                  <Box textAlign="match-parent" w="100%">
                  
                  <Box>ROLE : {profileDetails.role}</Box>
                  <Box>TEAM : {profileDetails.team}</Box>
                  <Box>EMAIL : {profileDetails.email}</Box>
                  <Box>MOBILE NUMBER : {profileDetails.mobileNo}</Box>
                  <Box>DATE OF JOINING : {profileDetails.d_o_j}</Box>
                  <Box>DATE OF BIRTH : {profileDetails.d_o_b}</Box>
                  </Box>
                </Box>
                <Flex mt={5} align="center">
                  <IconButton
                    icon={<FaEdit />}
                    onClick={handleEditClick}
                    aria-label="Edit"
                  />
                </Flex>
              </>
            )}
            <Button ml={3} colorScheme="red" onClick={handleLogout}>
                    Logout
                  </Button>
          </VStack>
        </Box>
      </Center>
    </ChakraProvider>
  );
};
export default Profile;