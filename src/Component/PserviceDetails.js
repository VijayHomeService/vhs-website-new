import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "./Footer";
import Pmobileheader from "./Pmobileheader";
import Pheader from "./Pheader";
import { Autocomplete } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import Switch from "react-switch";

const steps = ["Moving details", "Add Items", "Add ons", "Review"];

export default function PserviceDetails() {
  // Google conversion script for tracking
  React.useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      gtag('event', 'conversion', {'send_to': 'AW-934679256/XXl5CMPnko0CENil2L0D'});
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup script when component unmounts
    };
  }, []);  // Runs when the component mounts

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [pickupLocation1, setPickupLocation1] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const handleChange = React.useCallback((checked) => {
    setChecked(checked);
  }, []);
  const handleChange1 = React.useCallback((checked) => {
    setChecked1(checked);
  }, []);
  const [isEditingPickupLocation, setIsEditingPickupLocation] =
    React.useState(false); // For toggling edit mode
  const autocompletePickupRef = React.useRef(null);
  const autocompleteDropRef = React.useRef(null);
  const location = useLocation();
  const {
    service,
    pickupLocation,
    dropLocation,
    mobilenumber,
    shiftingdate,
    selectedCity,
  } = location.state || {};

  console.log(
    "dta",
    service,
    pickupLocation,
    dropLocation,
    mobilenumber,
    shiftingdate,
    selectedCity
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (pickupLocation) {
      setPickupLocation1(pickupLocation);
    }
  }, [pickupLocation]);

  console.log("pickupLocation1", pickupLocation1);

  const isStepOptional = (step) => {
    return step === 1; // Step 1 is optional
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Define content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Typography>
            <div className="row mt-3 " style={{ justifyContent: "center" }}>
              <div className="col-md-6" style={{ padding: "20px" }}>
                <div className="">
                  <div
                    className="poppins-regular"
                    style={{ fontWeight: "bold" }}
                  >
                    Pickup Location
                  </div>

                  {/* Conditional rendering based on edit mode */}
                  {/* {!isEditingPickupLocation ? (
                    <div>
                      <input
                        type="text"
                        className="poppins-light col-md-12"
                        value={pickupLocation1}
                        readOnly
                        style={{
                          color: "grey",
                          fontSize: "12px",
                          border: "none",
                          outline: "none",
                          width: "100%",
                          padding: "8px",
                          marginTop: "5px",
                          height: "40px",
                          border: "1px solid grey",
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                      <Button
                        onClick={() => setIsEditingPickupLocation(true)}
                        style={{
                          marginTop: "10px",
                          backgroundColor: "orange",
                          color: "white",
                        }}
                      >
                        Edit Pickup Location
                      </Button>
                    </div>
                  ) : ( */}
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompletePickupRef.current = autocomplete;
                    }}
                    onPlaceChanged={() => {
                      const place = autocompletePickupRef.current.getPlace();
                      if (!place || !place.geometry) {
                        alert("Please select a valid location.");
                        return;
                      }

                      const formattedAddress =
                        place.formatted_address || "Unknown address";

                      setPickupLocation1(formattedAddress);

                      console.log({
                        address: formattedAddress,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                      });
                      setIsEditingPickupLocation(false);
                    }}
                  >
                    <input
                      type="text"
                      className="poppins-light col-md-12"
                      placeholder="Sending from"
                      value={pickupLocation1}
                      onChange={(e) => setPickupLocation1(e.target.value)}
                      onClick={() => setIsEditingPickupLocation(true)}
                      style={{
                        color: "grey",
                        fontSize: "12px",
                        border: "none",
                        outline: "none",
                        width: "100%",
                        padding: "8px",
                        marginTop: "5px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    />
                  </Autocomplete>
                  {/* )} */}
                </div>
                <div className="d-flex">
                  <div className="col-md-10">
                    <div
                      className="poppins-regular"
                      style={{ textAlign: "left", fontWeight: "bold" }}
                    >
                      Service lift available at pickup
                    </div>
                    <div
                      className="poppins-regular pt-1"
                      style={{ color: "grey" }}
                    >
                      A working service lift will reduce the overall quote
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="form-check form-switch">
                      <Switch onChange={handleChange} checked={checked} />
                    </div>
                  </div>
                </div>
                {checked && (
                  <div>
                    <div
                      className="poppins-regular pt-3"
                      style={{ fontWeight: "bold" }}
                    >
                      Floor Number
                    </div>
                    <input
                      type="text"
                      className="poppins-light col-md-12"
                      placeholder="Floor number"
                      style={{
                        color: "grey",
                        fontSize: "12px",
                        border: "none",
                        outline: "none",
                        width: "100%",
                        padding: "8px",
                        marginTop: "5px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    />
                  </div>
                )}

                <div className="mt-3">
                  <div
                    className="poppins-regular"
                    style={{ fontWeight: "bold" }}
                  >
                    Drop Location
                  </div>

                  {/* Conditional rendering based on edit mode */}
                  {/* {!isEditingPickupLocation ? (
                    <div>
                      <input
                        type="text"
                        className="poppins-light col-md-12"
                        value={pickupLocation1}
                        readOnly
                        style={{
                          color: "grey",
                          fontSize: "12px",
                          border: "none",
                          outline: "none",
                          width: "100%",
                          padding: "8px",
                          marginTop: "5px",
                          height: "40px",
                          border: "1px solid grey",
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                      <Button
                        onClick={() => setIsEditingPickupLocation(true)}
                        style={{
                          marginTop: "10px",
                          backgroundColor: "orange",
                          color: "white",
                        }}
                      >
                        Edit Pickup Location
                      </Button>
                    </div>
                  ) : ( */}
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompletePickupRef.current = autocomplete;
                    }}
                    onPlaceChanged={() => {
                      const place = autocompletePickupRef.current.getPlace();
                      if (!place || !place.geometry) {
                        alert("Please select a valid location.");
                        return;
                      }

                      const formattedAddress =
                        place.formatted_address || "Unknown address";

                      setPickupLocation1(formattedAddress);

                      console.log({
                        address: formattedAddress,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                      });
                      setIsEditingPickupLocation(false);
                    }}
                  >
                    <input
                      type="text"
                      className="poppins-light col-md-12"
                      placeholder="Sending from"
                      value={pickupLocation1}
                      onChange={(e) => setPickupLocation1(e.target.value)}
                      onClick={() => setIsEditingPickupLocation(true)}
                      style={{
                        color: "grey",
                        fontSize: "12px",
                        border: "none",
                        outline: "none",
                        width: "100%",
                        padding: "8px",
                        marginTop: "5px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    />
                  </Autocomplete>
                  {/* )} */}
                </div>

                <div className="d-flex">
                  <div className="col-md-10">
                    <div
                      className="poppins-regular"
                      style={{ textAlign: "left", fontWeight: "bold" }}
                    >
                      Service lift available at drop
                    </div>
                    <div
                      className="poppins-regular pt-1"
                      style={{ color: "grey" }}
                    >
                      A working service lift will reduce the overall quote
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="form-check form-switch">
                      <Switch onChange={handleChange1} checked={checked1} />
                    </div>
                  </div>
                </div>
                {checked1 && (
                  <div>
                    <div
                      className="poppins-regular pt-3"
                      style={{ fontWeight: "bold" }}
                    >
                      Floor Number
                    </div>
                    <input
                      type="text"
                      className="poppins-light col-md-12"
                      placeholder="Floor number"
                      style={{
                        color: "grey",
                        fontSize: "12px",
                        border: "none",
                        outline: "none",
                        width: "100%",
                        padding: "8px",
                        marginTop: "5px",
                        height: "40px",
                        border: "1px solid grey",
                      }}
                    />
                  </div>
                )}

                <div
                  className="poppins-regular pt-3"
                  style={{ fontWeight: "bold" }}
                >
                  Shiffting Date
                </div>
                <input
                  type="date"
                  className="poppins-light col-md-12"
                  placeholder="Floor number"
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    height: "40px",
                    border: "1px solid grey",
                  }}
                />

                <div className="poppins-italic"></div>
              </div>
              <div className="col-md-6"></div>
            </div>
          </Typography>
        );
      case 1:
        return (
          <Typography>
            <div className="row mt-3" style={{ justifyContent: "center" }}>
              <div className="col-md-8">
                <div className="poppins-black text-center">Add Item</div>
              </div>
            </div>
          </Typography>
        );
      case 2:
        return (
          <Typography>
            <div className="row mt-3" style={{ justifyContent: "center" }}>
              <div className="col-md-8">
                <div className="poppins-black text-center">Add Ons</div>
              </div>
            </div>
          </Typography>
        );
      case 3:
        return (
          <Typography>
            <div className="row mt-3" style={{ justifyContent: "center" }}>
              <div className="col-md-8">
                <div className="poppins-black text-center">Review</div>
              </div>
            </div>
          </Typography>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <div className="">
      <Pheader />
      <Pmobileheader />
      <div className="container">
        <div className="row mt-5">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"></Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps} className="poppins--black">
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {/* Step Content */}
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - You're finished!
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* Show step content based on active step */}
                <Box sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="poppins-black"
                    style={{
                      backgroundColor: "orange",
                      color: "white",
                      letterSpacing: "2px",
                      width: "150px",
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
      <Footer />
    </div>
  );
}
