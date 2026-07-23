import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// --- Environment Variables ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if credentials are valid (not blank or placeholder)
export const isMockFirebase = !firebaseConfig.apiKey || firebaseConfig.apiKey.trim() === "";

let app;
let auth: any = null;
let db: any = null;

// Initialize Real Firebase if credentials are provided
if (!isMockFirebase) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("🔥 Firebase initialized successfully.");
  } catch (error) {
    console.error("❌ Error initializing Firebase, falling back to mock mode:", error);
  }
} else {
  console.log("ℹ️ Firebase credentials missing. Running in Mock Local Mode.");
}

// --- Simplified API with Fallbacks ---

// Mock State Subscriptions for Auth
let mockAuthCallback: ((user: any) => void) | null = null;

const getStoredMockUser = () => {
  const stored = localStorage.getItem("sanchar_mock_user");
  return stored ? JSON.parse(stored) : null;
};

/**
 * Subscribes to authentication state changes.
 */
export const onAuthChange = (callback: (user: any) => void) => {
  if (!isMockFirebase && auth) {
    return onAuthStateChanged(auth, callback);
  } else {
    mockAuthCallback = callback;
    // Dispatch initial state from localStorage
    const mockUser = getStoredMockUser();
    callback(mockUser);
    return () => {
      mockAuthCallback = null;
    };
  }
};

/**
 * Triggers Google Sign-In sequence.
 */
export const signInWithGoogle = async (): Promise<any> => {
  if (!isMockFirebase && auth) {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } else {
    // Simulate interactive sign-in
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: "mock-user-jaipur-101",
          displayName: "Amit Sharma",
          email: "amit.sharma@sanchar.in",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
        };
        localStorage.setItem("sanchar_mock_user", JSON.stringify(mockUser));
        if (mockAuthCallback) mockAuthCallback(mockUser);
        resolve(mockUser);
      }, 800);
    });
  }
};

/**
 * Signs the current user out.
 */
export const logoutUser = async (): Promise<void> => {
  if (!isMockFirebase && auth) {
    await signOut(auth);
  } else {
    localStorage.removeItem("sanchar_mock_user");
    if (mockAuthCallback) mockAuthCallback(null);
  }
};

/**
 * Persists direct inquiries (Contact Form) to Firestore.
 */
export const saveInquiry = async (inquiryData: {
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  vision: string;
  uid?: string;
}) => {
  if (!isMockFirebase && db) {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...inquiryData,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } else {
    console.log("💾 [Mock Save] Inquiry persisted in 'inquiries' collection:", inquiryData);
    return "mock-doc-inquiry-id";
  }
};

/**
 * Persists cost estimations to Firestore.
 */
export const saveQuote = async (quoteData: {
  area: number;
  type: string;
  estimatedInvestment: string;
  uid?: string;
}) => {
  if (!isMockFirebase && db) {
    const docRef = await addDoc(collection(db, "quotes"), {
      ...quoteData,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } else {
    console.log("💾 [Mock Save] Estimate persisted in 'quotes' collection:", quoteData);
    return "mock-doc-quote-id";
  }
};

/**
 * Persists Vastu PDF download registrations.
 */
export const saveVastuRequest = async (vastuData: {
  email: string;
  uid?: string;
}) => {
  if (!isMockFirebase && db) {
    const docRef = await addDoc(collection(db, "vastu_requests"), {
      ...vastuData,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } else {
    console.log("💾 [Mock Save] Vastu Guide Request persisted in 'vastu_requests' collection:", vastuData);
    return "mock-doc-vastu-id";
  }
};
