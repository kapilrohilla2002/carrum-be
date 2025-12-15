import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import driverConstants from '../constants/constants';

export type DriverDocument = HydratedDocument<Driver>;
const { DriverStatus, InterestLevel, LeadStatus, UberIdStatus, VerificationStatus, DriverOnboardingStatus, DriverVehicleStatus, DriverVehicleDropReason, DocUploadStatus, AgreementStatus, ProofType, Languages, AgreementMode, AgreementType } = driverConstants;

@Schema()
class HouseLocation {
    @Prop({
        required: false,
        nullable: true,
    })
    lat: number;
    @Prop({
        required: false,
        nullable: true,
    })
    long: number;
}

@Schema({ timestamps: true })
class PicSchema {
    @Prop({
        required: true,
        nullable: false
    })
    url: string;
}

@Schema()
class AgentInfo {
    @Prop({
        required: true,
        ref: 'users'
    })
    userId: Types.ObjectId;
    @Prop({
        required: false,
        nullable: true,
    })
    name: string;
}

@Schema()
class BankInfo {
    @Prop({
        required: false,
        nullable: true,
    })
    passbookPic: PicSchema;
    @Prop({
        required: false,
        nullable: true,
    })
    pancardNumber: string;
    @Prop({
        required: false,
        nullable: true,
    })

    pancardPic: PicSchema;
    @Prop({
        required: false,
        nullable: true,
    })

    bankAccountNumber: string;
    @Prop({
        required: false,
        nullable: true,
    })

    @Prop({
        required: false,
        allowNull: true
    })
    bankIfscCode: string;
}

@Schema()
class AadharInfo {
    @Prop({
        required: false,
        nullable: true,
    })
    aadharNumber: string;
    @Prop({
        required: false,
        nullable: true,
    })
    frontPic: PicSchema;
    @Prop({
        required: false,
        nullable: true,
    })
    backPic: PicSchema;
    @Prop({
        required: true,
        nullable: false,
        enum: DocUploadStatus,
        default: "PENDING"
    })
    status: string;
}

@Schema()
class AddressSchema {
    @Prop({
        required: false,
        nullable: true,
    })
    addLine1: string;
    @Prop({
        required: false,
        nullable: true,
    })
    addLine2: string;
    @Prop({
        required: false,
        nullable: true,
    })
    city: string;
    @Prop({
        required: false,
        nullable: true,
    })
    landmark: string;
    @Prop({
        required: false,
        nullable: true,
    })
    pinCode: string;
    @Prop({
        required: false,
        nullable: true,
    })
    state: string;
    @Prop({
        required: false,
        nullable: true,
        enum: ProofType
    })
    proofType: string;
    @Prop({
        required: false,
        nullable: true,
    })
    proofPic: string;
    @Prop({
        required: false,
        nullable: true,
    })
    proofNumber: string;
}

@Schema()
class VerificationDetail {
    @Prop({
        required: false,
        nullable: true,
    })
    policeStation: string;
    @Prop({
        required: false,
        nullable: true,
    })
    district: string;
    @Prop({
        required: false,
        nullable: true,
    })
    fatherName: string;
    @Prop({
        required: false,
        nullable: true,
    })
    motherName: string;
    @Prop({
        required: false,
        nullable: true,
    })
    placeOfBirth: string;
    @Prop({
        required: false,
        nullable: true,
    })
    dateOfBirth: Date;

    @Prop({
        required: false,
        nullable: true,
    })
    currentAddress: AddressSchema;

    @Prop({
        required: false,
        nullable: true,
    })
    permanentAddress: AddressSchema;
}

@Schema()
class DrivingLicenseInfo {
    @Prop({
        required: false,
        nullable: true
    })
    dlNumber: string;
    @Prop({
        required: false,
        nullable: true
    })
    dlIssueDate: Date;
    @Prop({
        required: false,
        nullable: true
    })
    dlExpiryDate: Date;
    @Prop({
        required: false,
        nullable: true
    })
    dlFrontPic: PicSchema;
    @Prop({
        required: false,
        nullable: true
    })
    dlBackPic: PicSchema;
    @Prop({
        required: true,
        nullable: false,
        enum: DocUploadStatus,
        default: 'PENDING'
    })
    status: string;
}

@Schema({ timestamps: true })
class AssignedEmis {
    @Prop({
        required: true,
        ref: 'assignedEmis'
    })
    emiId: Types.ObjectId;

    @Prop({
        required: true,
        min: 0,
        default: 0
    })
    downPayment: number;

    @Prop({
        required: false,
        nullable: true,
    })
    paidTenure: number;

    @Prop({
        required: true,
        min: 1
    })
    maxTenure: number;

    @Prop({
        required: true,
        ref: 'users'
    })
    createdBy: Types.ObjectId;
}

@Schema()
class Agreements {
    @Prop({
        required: false,
        nullable: true,
        enum: ['PENDING', 'COMPLETED', "FAILED"]
    })
    status: string;

    @Prop({
        required: false,
        nullable: true
    })
    digioId: string;

    @Prop({
        required: false,
        nullable: true
    })
    agreementFailedReason: string;

    @Prop({
        required: false,
        nullable: true
    })
    offlinePic: PicSchema;

    @Prop({
        required: false,
        nullable: true,
        enum: AgreementMode
    })
    aggrementMode: string;

    @Prop({
        required: false,
        nullable: true,
        enum: AgreementType
    })
    agreementType: string;
}

@Schema()
class LeadInfo {
    @Prop({
        required: true,
        nullable: false,
        enum: InterestLevel,
    })
    interestLevel: string;

    @Prop({
        required: true,
        default: 'CREATED',
        enum: LeadStatus,
        nullable: true
    })
    leadStatus: string;

    @Prop({
        required: false,
        nullable: true
    })
    leadStatusRemarks: string;

    @Prop({
        required: true,
        nullable: true
    })
    leadStatusChangeDate: Date;

    @Prop({
        required: false,
        nullable: true
    })
    source: string;

    @Prop({
        required: false,
        nullable: true
    })
    ethnicity: string;

    @Prop({
        required: false,
        nullable: true
    })
    assignedEmis: AssignedEmis[];

    @Prop({
        required: false,
        nullable: true
    })
    lastPositiveIntentAt: Date;

    @Prop({
        required: false,
        nullable: true,
    })
    telecallerInfo: AgentInfo;

    @Prop({
        required: false,
        nullable: true,
    })
    verificationAgent: AgentInfo;
}

@Schema()
class DriverInfo {
    @Prop({
        required: true,
        nullable: true
    })
    uberId: string;

    @Prop({
        required: true,
        nullable: true,
        enum: UberIdStatus
    })
    uberIdStatus: string;

    @Prop({
        required: true,
        nullable: true,
        enum: VerificationStatus
    })
    verificationStatus: string;

    @Prop({
        required: true,
        nullable: true,
        enum: DriverOnboardingStatus
    })
    driverOnboardingStatus: string;

    @Prop({
        required: true,
        nullable: true,
    })
    driverOnboardingStatusChangeDate: Date;

    @Prop({
        required: false,
        nullable: true,
        enum: DriverVehicleStatus
    })
    driverVehicleStatus: string;

    @Prop({
        required: false,
        nullable: true,
    })
    driverVehicleStatusChangeDate: Date;

    @Prop({
        required: false,
        nullable: true,
        enum: DriverVehicleDropReason
    })
    driverVehicleDropReason: string;

    @Prop({
        required: true,
        nullable: true
    })
    dateOfJoining: string;

    @Prop({
        required: false,
        nullable: true,
        enum: Languages
    })
    language: string;

    @Prop({
        required: false,
        nullable: true,
    })
    verificationDetail: VerificationDetail;

    @Prop({
        required: false,
        nullable: true,
    })
    drivingLicenseInfo: DrivingLicenseInfo;

    @Prop({
        required: false,
        nullable: true,
    })
    aadharInfo: AadharInfo;

    @Prop({
        required: false,
        nullable: true,
    })
    bankInfo: BankInfo;

    @Prop({
        required: false,
        nullable: true,
    })
    onboardingAgent: AgentInfo;

    @Prop({
        required: false,
        nullable: true,
    })
    driverManagerInfo: AgentInfo;

    @Prop({
        required: false,
        nullable: true,
        enum: AgreementStatus
    })
    agreementStatus: string;

    @Prop({
        required: false,
        nullable: true,
    })
    sarpanchName: string;

    @Prop({
        required: false,
        nullable: true,
    })
    sarpanchAddress: AddressSchema;

    @Prop({
        required: false,
        nullable: true,
    })
    previousEmployerAddress: AddressSchema;

    @Prop({
        required: false,
        nullable: true,
    })
    previousEmployerName: string;

    @Prop({
        required: false,
        nullable: true
    })
    relativeName: string;

    @Prop({
        required: false,
        nullable: true
    })
    relativePhoneNumber: string;

    @Prop({
        required: false,
        nullable: true
    })
    relativeAddress: AddressSchema;

    @Prop({
        required: false,
        nullable: true
    })
    houseLocation: HouseLocation;

    @Prop({
        required: false,
        nullable: true
    })
    aggrements: Agreements[];
}

@Schema({
    timestamps: true,
})
export class Driver {
    @Prop({
        ref: 'users',
        unique: true,
        required: true
    })
    userId: Types.ObjectId;

    @Prop({
        enum: DriverStatus,
        default: 'LEAD'
    })
    status: string;

    @Prop({
        required: true,
        nullable: true
    })
    carrumId: string;

    @Prop({
        required: false,
        nullable: true,
        ref: 'drivers'
    })
    parentDriverId: Types.ObjectId;

    @Prop({
        required: false,
        nullable: true,
        ref: "VehicleSchemes"
    })
    schemeId: Types.ObjectId;

    @Prop({
        required: true,
        nullable: false,
        ref: 'users'
    })
    createdBy: Types.ObjectId;

    @Prop({
        required: true,
        ref: 'hubs'
    })
    hubId: Types.ObjectId;

    @Prop({
        required: true,
        ref: 'fileUploads'
    })
    fileUploadId: Types.ObjectId;

    @Prop({
        required: false,
        nullable: true
    })
    lead: LeadInfo;

    @Prop({
        required: false,
        nullable: true
    })
    driver: DriverInfo;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);