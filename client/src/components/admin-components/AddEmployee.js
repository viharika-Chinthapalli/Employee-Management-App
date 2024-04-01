import React, { useState } from "react";
import axios from "axios";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, setDoc } from "firebase/firestore";

const AddEmployee = ({ isOpen, onClose }) => {
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleDateOfJoiningChange = (event) => {
    setDateOfJoining(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAddEmployee = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !dateOfJoining ||
      !selectedTeam
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }
    setDateOfJoining("");
    setSelectedTeam("");
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setPhoneNumber("");
    setDateOfBirth("");
    setSubmitButtonDisabled(true);

    let user;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      user = res.user;

      await updateProfile(user, {
        displayName: name,
      });
      const employeeRef = doc(firestore, "employees", user.uid);
      await setDoc(employeeRef, {
        name,
        email,
        team: selectedTeam,
        role,
        phoneNumber,
        dateOfBirth,
        dateOfJoining,
        password,
      });
      const employeeData = {
        name,
        email,
        team: selectedTeam,
        role,
        phoneNumber,
        dateOfBirth,
        dateOfJoining,
        password,
      };
      await axios.post(
        "https://staff-minder-backend.onrender.com/api/employees",
        employeeData
      );

      console.log("Employee data saved to Firestore and backend.");
      toast.success("Employee added successfully.");
      setSubmitButtonDisabled(false);
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
      if (user && error.code === "auth/email-already-in-use") {
        await user.delete();
      }

      toast.error("Error adding employee. Please try again.");
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="lg">
            Add Employee
          </Heading>
        </ModalHeader>
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              borderColor="black"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              borderColor="black"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Team</FormLabel>
            <Select
              placeholder="Select a team"
              value={selectedTeam}
              onChange={handleTeamChange}
              borderColor="black"
            >
              <option value="">Select a team</option>
              <option value="devops">Devops</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="testing">Testing</option>
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Role</FormLabel>
            <Select
              value={role}
              onChange={handleRoleChange}
              borderColor="black"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              borderColor="black"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              borderColor="black"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Date of Joining</FormLabel>
            <Input
              type="date"
              value={dateOfJoining}
              onChange={handleDateOfJoiningChange}
              borderColor="black"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                borderColor="black"
              />
              <InputRightElement>
                <IconButton
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  variant="ghost"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onClose} mr="2">
            Cancel
          </Button>
          <Button
            disabled={submitButtonDisabled}
            colorScheme="blue"
            onClick={handleAddEmployee}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployee;
