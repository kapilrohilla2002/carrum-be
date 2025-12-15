
const DriverStatus = ['LEAD', 'DRIVER']
const InterestLevel = ['COLD', 'WARM', 'HOT'];
const LeadStatus = ['CREATED', 'TC_Attempted', 'TC_Contacted', 'Interested', "NOT_INTERESTED", "VISIT_SCHEDULED", "VISIT_DONE", "DND", "ACTIVE"];
const UberIdStatus = ['PENDING', 'APPROVAL_PENDING', 'APPROVED', 'REJECTED']
const VerificationStatus = ['PENDING', 'APPROVED', 'REJECTED'];
const DriverOnboardingStatus = ['VA_TO_BE_ASSIGNED', 'VA_IN_VERIFICATION', 'VA_VERIFIED', 'ONBOARDING_DROP', 'ACTIVE', 'DRIVER_RETURN'];
const DriverVehicleStatus = ['PENDING', 'ASSIGNED', 'REMOVED'];
const DriverVehicleDropReason = ['PERMANENT_DROP', 'MAINTAINANCE_DROP', 'EXCHANGE_DROP', 'TEMPORARY_DROP'];
const DocUploadStatus = ['PENDING', 'UPLOADED'];
const AgreementStatus = ['PENDING', 'REQUESTED', "COMPLETED", "FAILED"];
const ProofType = ['AADHAR', 'PAN', 'DRIVING_LICENSE', 'OTHER'];
const Languages = ['Telugu', 'Hindi', 'Kannada', 'Marathi', 'English', 'Malayalam', 'Punjabi', 'Tamil', 'Bengali', 'Assamese', 'Bhojpuri', 'Kashmiri', 'Odia', 'Gujarati', 'Bodo', 'Manipuri'];
const AgreementMode = ['OFFLINE', 'ONLINE'];
const AgreementType = ['SD', 'SCHEME_CHANGE', 'ADD_CAR', 'REMOVE_CAR'];

const driverConstants = { DriverStatus, InterestLevel, LeadStatus, UberIdStatus, VerificationStatus, DriverOnboardingStatus, DriverVehicleStatus, DriverVehicleDropReason, DocUploadStatus, AgreementStatus, ProofType, Languages, AgreementMode, AgreementType };

export default driverConstants;