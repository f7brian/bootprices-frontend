import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interfaces
interface Space {
  id: string;
  name: string;
  description: [];
  price: string;
}

interface packge {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  appartmentUnit: string;
  city: string;
  state: string;
}

interface StepLoginState {
  selectedService: Service | null;
  selectedSpace: Space | null;
  selectedAddOns: AddOn[];
  addOnQuantities: Record<string, number>;
  estimatePrice: string | null;
  images?: string[];
  projectDescription?: string;
  popularPackge?: packge | null;

  // Newly added fields
  personalInformation: PersonalInformation;
  accessInstructions: string;
  dates: string[];

  // Added selectedColor field
  selectedColor?: string;
}

// Initial state
const initialState: StepLoginState = {
  selectedService: null,
  selectedSpace: null,
  selectedAddOns: [],
  addOnQuantities: {},
  estimatePrice: null,
  images: [],
  projectDescription: "",

  personalInformation: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    appartmentUnit: "",
    city: "",
    state: "",
  },
  accessInstructions: "",
  dates: [],
};

// Create slice
const stepLoginSlice = createSlice({
  name: "stepLogin",
  initialState,
  reducers: {
    setSelectedService: (state, action: PayloadAction<Service>) => {
      state.selectedService = action.payload;
    },
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
    setSelectedSpaces: (state, action: PayloadAction<Space>) => {
      state.selectedSpace = action.payload;
      state.estimatePrice = action.payload.price;
    },
    clearSelectedSpace: (state) => {
      state.selectedSpace = null;
      state.estimatePrice = null;
    },
    setSelectedAddOns: (state, action: PayloadAction<AddOn[]>) => {
      state.selectedAddOns = action.payload;
    },
    setAddOnQuantities: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      state.addOnQuantities = action.payload;
    },
    setEstimatePrice: (state, action: PayloadAction<string | null>) => {
      state.estimatePrice = action.payload;
    },
    setPopularPackge: (state, action: PayloadAction<packge | null>) => {
      state.popularPackge = action.payload;
    },
    setSelectedColors: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
    setImagesAndDescription: (
      state,
      action: PayloadAction<{ images: string[]; description: string }>
    ) => {
      state.images = action.payload.images;
      state.projectDescription = action.payload.description;
    },

    // ✅ Personal Info, Access, Dates
    setPersonalInformation: (
      state,
      action: PayloadAction<PersonalInformation>
    ) => {
      state.personalInformation = action.payload;
    },
    setAccessInstructions: (state, action: PayloadAction<string>) => {
      state.accessInstructions = action.payload;
    },
   

    setDatesSafe: (state, action: PayloadAction<unknown>) => {
      if (
        Array.isArray(action.payload) &&
        action.payload.every((d) => typeof d === "string")
      ) {
        state.dates = action.payload as string[];
      }
    },
    addDate: (state, action: PayloadAction<string>) => {
      if (!state.dates.includes(action.payload)) {
        state.dates.push(action.payload);
      }
    },
    removeDate: (state, action: PayloadAction<string>) => {
      state.dates = state.dates.filter((date) => date !== action.payload);
    },

    // ✅ Reset all step-related data
    clearAllStepData: (state) => {
      state.selectedService = null;
      state.selectedSpace = null;
      state.selectedAddOns = [];
      state.addOnQuantities = {};
      state.estimatePrice = null;
      state.images = [];
      state.projectDescription = "";
      state.personalInformation = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        appartmentUnit: "",
        city: "",
        state: "",
      };
      state.accessInstructions = "";
      state.dates = [];
    },
  },
});

// Exports
export const {
  setSelectedService,
  clearSelectedService,
  setSelectedSpaces,
  clearSelectedSpace,
  setSelectedAddOns,
  setAddOnQuantities,
  setEstimatePrice,
  setPopularPackge,
  setImagesAndDescription,
  setPersonalInformation,
  setAccessInstructions,
  setDatesSafe,
  addDate,
  removeDate,
  clearAllStepData,
  setSelectedColors,
} = stepLoginSlice.actions;

export default stepLoginSlice.reducer;
